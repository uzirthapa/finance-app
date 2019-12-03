import { db, auth } from "@/plugins/firebase";
import axios from "axios"
const actions = {
    fetchUser({ dispatch, commit }) {
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                db.collection("users").doc(auth.currentUser.uid).get()
                    .then((doc) => {
                        if (doc.exists) {

                            console.log("Document data:", doc.data());
                            commit("updateUser", doc.data())
                            dispatch("fetchUserIncome", doc.data().spending_category)
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });
            }
        })
    },
    fetchIncomeRanges({ commit }) {
        var incomeRanges = []
        db.collection("spending_category").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                incomeRanges.push(doc.data())
            })
        })
        commit("updateIncomeRanges", incomeRanges)
    },
    fetchUserIncome({ commit }, spendingCategory) {
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                db.collection("spending_category").doc(spendingCategory).get().then((doc) => {
                    if (doc.exists) {
                        doc.data()
                        commit("updateUserIncome", doc.data())
                    } else {
                        console.log("document does not exist")
                    }
                }).catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error getting document: ", error);
                });
            }
        })
    },
    updateUserIncome({ dispatch, commit }, spendingCategory) {
        return new Promise((resolve, reject) => {
            db.collection("users").doc(auth.currentUser.uid).update({
                spending_category: spendingCategory
            }).then(function (res) {
                console.log(res)
                resolve()
                // dispatch("fetchUserIncome")
                console.log("Document successfully updated!");
            })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        })
    },

}

export default actions