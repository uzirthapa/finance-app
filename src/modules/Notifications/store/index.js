import actions from "./notifications.actions";
import mutations from "./notifications.mutations";
import getters from "./notifications.getters";
import state from "./notifications.state";
// make our modules namespaced to avoid method name conflicts
const namespaced = true;

const notifications = {
    namespaced,
    getters,
    mutations,
    actions,
    state
};

export default notifications;