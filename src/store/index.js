import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from "@/modules/Auth/store";
import transactions from "@/modules/Transactions/store";
import shared from "@/modules/Shared/store";
import account from "@/modules/Account/store"
import notifications from "@/modules/Notifications/store"

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    transactions,
    shared,
    account,
    notifications
  }
})
