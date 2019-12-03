const getters = {
    transactions: state => {
        return state.transactions
    },
    balance: state => {
        return state.balance
    },
    avgSpending: state => {
        return state.avgSpending
    },
    institutions: state => {
        return state.institutions
    },
    icons: state => {
        return state.icons
    },
    dateRange: state => {
        return state.dateRange
    },
    totalSpending: state => {
        return state.totalSpending
    },
    currentDate: state => {
        return state.currentDate
    }
}

export default getters