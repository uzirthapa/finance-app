const getters = {
    user: state => {
        return state.user
    },
    incomeRanges: state => {
        return state.incomeRanges.sort((a, b) => (a.order > b.order) ? 1 : -1)
    },
    userIncome: state => {
        return state.userIncome
    }
}

export default getters