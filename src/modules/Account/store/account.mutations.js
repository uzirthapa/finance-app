const mutations = {
    updateUser(state, value) {
        state.user = value
    },
    updateIncomeRanges(state, value) {
        console.log(value)
        state.incomeRanges = value
    },
    updateUserIncome(state, value) {
        state.userIncome = value
    }
}

export default mutations