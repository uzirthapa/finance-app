import { db, auth } from "@/plugins/firebase";
import axios from 'axios'
const actions = {
    fetchSharedRequests({ commit }) {
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                var requests = []
                db.collection("users").doc(auth.currentUser.uid).collection("sharedRequests").where("pending", "==", true).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        requests.push(doc.data())
                    })

                    commit("updateRequests", requests)
                })
            }
        })
    },
    acceptSharedRequest({ commit }, id) {
        db.collection("users").doc(auth.currentUser.uid).collection("sharedRequests").doc(id).update({
            pending: false,
            accepted: true,
            declined: false
        }).then(() => {
            axios.get('https://us-central1-finance-app-87c49.cloudfunctions.net/updateSharedStatus?shareId=' + id + '&status=true').then((response) => {
                console.log(response)
            })
            console.log("accepted shared request: ", id)
        })
    },
    declineSharedRequest({ commit }, id) {
        db.collection("users").doc(auth.currentUser.uid).collection("sharedRequests").doc(id).update({
            pending: false,
            accepted: false,
            declined: true
        }).then(() => {
            axios.get('https://us-central1-finance-app-87c49.cloudfunctions.net/updateSharedStatus?shareId=' + id + '&status=false').then((response) => {
                console.log(response)
            })
            console.log("declined shared request: ", id)
        })
    }
}

export default actions