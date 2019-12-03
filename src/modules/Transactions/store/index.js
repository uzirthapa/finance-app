import actions from "./transactions.actions";
import mutations from "./transactions.mutations";
import getters from "./transactions.getters";
import state from "./transactions.state";
// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const transactions = {
    namespaced,
    getters,
    mutations,
    actions,
    state
};

export default transactions;
