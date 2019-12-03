import { db, auth } from "@/plugins/firebase";
import { bus } from "@/main";
import axios from 'axios'
const actions = {
    updateUserShared({ commit }, params) {
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                commit("updateLoading", true)
                var ref = db.collection("sharedProfiles").doc()
                ref.set({
                    id: ref.id,
                    primaryEmail: auth.currentUser.email,
                    primaryUid: auth.currentUser.uid,
                    secondaryEmail: params.email
                }).then(() => {

                    db.collection("users").doc(auth.currentUser.uid).collection("shared").doc(ref.id).set({
                        email: params.email,
                        primaryName: params.name,
                        primaryEmail: auth.currentUser.email,
                        pending: true,
                        accepted: false,
                        declined: false,
                        id: ref.id
                    }).then(() => {
                        commit("updateLoading", false)
                        bus.$emit("show-snackbar", "Your invitation is sent to " + params.email);
                    })

                    // db.collection("users").doc(auth.currentUser.uid).update({
                    //     shared: [
                    //         { email: email, id: ref.id }
                    //     ]
                    // }).then(() => {
                    //     bus.$emit("show-snackbar", "Your invitation is sent to " + email);
                    // })
                })
            }
        })

    },
    fetchSharedTransactions({ commit }) {
        var sharedTransactions = []
        commit("updateLoading", true)
        console.log("shared Transactions")
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                auth.currentUser.getIdToken(true).then((token) => {
                    console.log(token)
                    axios.get('https://us-central1-finance-app-87c49.cloudfunctions.net/sharedTransactionsV2?token=' + token).then((response) => {
                        console.log(response)
                        commit("updateLoading", false)
                        commit("updateSharedTransactions", response)
                        // if (response.data.transactions instanceof Array) {
                        //     transactions = transactions.concat(response.data.transactions)
                        // }
                        // transactions = response.data.transactions
                        // console.log(state)
                        // commit("updateTransactions", { institution: params.inst, transactions })
                    })
                })
            }
        })
    },
    fetchSharedWith({ commit }) {
        var sharedWithUsers = []
        commit("updateLoading", true)
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                db.collection("users").doc(auth.currentUser.uid).collection("shared").get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.data())
                        sharedWithUsers.push(doc.data())
                    })
                    commit("updateLoading", false)
                    commit("updateSharedWithUsers", sharedWithUsers)
                })
            }
        })
    }
}

export default actions 