import { db, auth } from "@/plugins/firebase";
import axios from 'axios'

const actions = {
    setCurrentDate({ commit }, currentDate) {
        commit("updateCurrentDate", currentDate)
    },
    submitNewBankAccessToken({ dispatch, commit }, bankDetails) {
        console.log(bankDetails)
        // console.log(institution)
        db.collection("users").doc(auth.currentUser.uid).collection("tokens").add({ token: bankDetails.public_token, institution: bankDetails.institution })
            .then((res) => {
                console.log(res)
                db.collection("users").doc(auth.currentUser.uid).collection("institutions").doc(res.id).set({ institution: bankDetails.institution, id: res.id })
                    .then((res2) => {
                        dispatch("fetchInstitutions")
                        dispatch("fetchTransactions")
                        console.log(res2)
                    })
            })


    },
    removeAccount({ dispatch, commit }, institution) {
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                auth.currentUser.getIdToken(true).then((token) => {
                    console.log(token)
                    axios.get("https://us-central1-finance-app-87c49.cloudfunctions.net/removeToken?token=" + token + "&inst=" + institution).then((res) => {
                        console.log(res)
                        dispatch("fetchInstitutions")
                    }).catch((err) => {
                        console.log(err)
                    })
                })
            }
        })
    },
    fetchInstitutions({ commit }) {
        return new Promise((resolve, reject) => {
            var institutions = []
            auth.onAuthStateChanged(function (user) {
                // console.log(user);
                if (user) {
                    db.collection("users").doc(auth.currentUser.uid).collection("institutions").get().then((querySnapshot) => {
                        querySnapshot.forEach((snapshot) => {
                            institutions.push(snapshot.data())
                        })
                        resolve(institutions)
                        commit("updateInstitutions", institutions)
                    }).catch((err) => {
                        reject(err)
                        console.log(err)
                    })
                }
            })
        })
    },
    fetchTransactions({ commit, state, dispatch }, params) {
        console.log(params.start)
        console.log(params.end)
        console.log(params.inst.id)
        var transactions = []
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                auth.currentUser.getIdToken(true).then((token) => {
                    console.log(token)
                    console.log(params.inst)
                    if (params.inst.id) {
                        if (params.start !== null) {

                            axios.get('https://us-central1-finance-app-87c49.cloudfunctions.net/transactionsV2?token=' + token + '&inst=' + params.inst.id + '&start=' + params.start + '&end=' + params.end).then((response) => {
                                console.log(response)
                                if (response.data.transactions instanceof Array) {
                                    transactions = transactions.concat(response.data.transactions)
                                }
                                // transactions = response.data.transactions
                                console.log(state)

                                commit("updateTransactions", { institution: params.inst, transactions })

                            })
                        } else {
                            // axios.get('https://us-central1-finance-app-87c49.cloudfunctions.net/transactionsV2?token=' + token + '&inst=' + params.inst.id).then((response) => {
                            //     console.log(response)
                            //     if (response.data.transactions instanceof Array) {
                            //         transactions = transactions.concat(response.data.transactions)
                            //     }
                            //     // transactions = response.data.transactions
                            //     // console.log(state)
                            //     commit("updateTransactions", { institution: params.inst, transactions })
                            // })
                        }


                    }



                }).catch((err) => {
                    console.log(err)
                })
            }
        })

    },
    updateTotalSpending({ commit, state }) {
        // console.log(totalSpending)
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                db.collection("users").doc(auth.currentUser.uid).update({
                    totalSpending: state.totalSpending
                })
            }
        })
    },

    fetchBalance({ commit }, inst) {
        var balance = []
        console.log(inst)
        auth.onAuthStateChanged(function (user) {
            // console.log(user);
            if (user) {
                auth.currentUser.getIdToken(true).then((token) => {
                    console.log(token)
                    axios.get('https://us-central1-finance-app-87c49.cloudfunctions.net/balance?token=' + token + '&inst=' + inst).then((response) => {
                        console.log(response)
                        commit("updateBalance", response)
                    })

                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    },
    updateDateRange({ commit }, dateRange) {
        console.log(dateRange)
        commit("updateDateRange", dateRange)
    },
    resetTransactions({ commit }) {
        commit("resetTransactions", [])
    },
    // fetchIncome({ commit }) {
    //     var allIncome = []
    //     auth.onAuthStateChanged(function (user) {
    //         // console.log(user);
    //         if (user) {
    //             db.collection("users").doc(auth.currentUser.uid).collection("tokens").get().then((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     console.log("fetch Income")
    //                     // console.log(doc.data())
    //                     if (doc.data().access_token) {
    //                         const access_token = doc.data().access_token
    //                         // console.log(access_token)
    //                         axios.get('https://us-central1-finance-app-87c49.cloudfunctions.net/income?token=' + access_token).then((response) => {
    //                             // console.log(response)
    //                             // console.log(response.data.income.income_streams)
    //                             // response.data.income.income_streams.forEach(function(value){
    //                             if (response.data.income.income_streams instanceof Array) {
    //                                 allIncome = allIncome.concat(response.data.income.income_streams)
    //                             }
    //                             // })
    //                             // allTransactions = response.data.transactions
    //                             console.log(allIncome)
    //                             commit("updateIncome", allIncome)

    //                         })

    //                     }

    //                 })
    //             })
    //         }
    //     })
    // },
    // fetchAvgSpending({ commit }, category) {
    //     db.collection("spending_category").doc(category).get()
    //         .then((doc) => {
    //             commit("updateAvgSpending", doc.data().avg)
    //             console.log(doc.data())
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    //     }

    // db.collection("users").doc(auth.currentUser.uid).get()
    //     .then((doc) => {
    //         if (doc.exists) {

    //             console.log("Document data:", doc.data());

    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     }).catch(function (error) {
    //         console.log("Error getting document:", error);
    //     });


}

export default actions;