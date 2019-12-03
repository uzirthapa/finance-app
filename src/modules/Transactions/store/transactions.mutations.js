const mutations = {
    updateTransactions(state, value) {
        state.transactions.push(value)
    },
    updateBalance(state, value) {
        state.balance.push(value)
    },
    updateAvgSpending(state, value) {
        state.avgSpending = value
    },
    updateInstitutions(state, value) {
        console.log(value)
        state.institutions = value
    },
    updateDateRange(state, value) {
        console.log(value)
        state.dateRange = value
    },
    resetTransactions(state, value) {
        state.transactions = value
    },
    setTotalSpending(state, value) {
        state.totalSpending = value
    },
    updateCurrentDate(state, value) {
        state.currentDate = value
    }
}

export default mutations;