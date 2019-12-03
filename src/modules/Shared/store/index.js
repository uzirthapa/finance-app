import actions from "./shared.actions";
import mutations from "./shared.mutations";
import getters from "./shared.getters";
import state from "./shared.state";
// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const shared = {
    namespaced,
    getters,
    mutations,
    actions,
    state
};

export default shared;