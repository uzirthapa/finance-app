const getters = {
    sharedTransactions: state => {
        return state.sharedTransactions
    },
    sharedWithUsers: state => {
        return state.sharedWithUsers
    },
    loading: state => {
        return state.loading
    }
}

export default getters