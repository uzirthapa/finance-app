<template>
  <div>
    <v-container v-if="sharedWithUsers.length > 0">
      <f-shared-with :sharedWithUsers="sharedWithUsers" />
    </v-container>
    <v-container v-if="sharedTransactions.data">
      <template v-for="(data,i) in sharedTransactions.data">
        <f-category-spend :key="i" v-if="data" :icons="icons" :userTransactions="data"></f-category-spend>
      </template>
      <v-btn block large outlined @click="shareDialog = true" class="mt-3">Share your Profile</v-btn>
    </v-container>
    <v-container class="fill-height" v-else>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-flex class="text-center">
            <div class="mb-3 grey--text">No Shared Profiles</div>
            <div
              class="mb-3 grey--text body-2"
            >Share your profile with a friend to see their spending habits!</div>
            <v-btn block large outlined @click="shareDialog = true">Share your Profile</v-btn>
          </v-flex>
        </v-col>
      </v-row>

      <!-- <f-category-spend></f-category-spend> -->
    </v-container>
    <v-dialog v-model="shareDialog">
      <f-share-dialog @close="shareDialog = false" @share="shareProfile" />
    </v-dialog>
  </div>
</template>

<script>
import FShareDialog from "../components/FShareDialog";
import FCategorySpend from "../components/FCategorySpend";
import FSharedWith from "../components/FSharedWith";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    FShareDialog,
    FCategorySpend,
    FSharedWith
  },
  data() {
    return {
      shareDialog: false
    };
  },
  computed: {
    ...mapGetters({
      sharedTransactions: "shared/sharedTransactions",
      user: "account/user",
      icons: "transactions/icons",
      sharedWithUsers: "shared/sharedWithUsers",
      loading: "shared/loading"
    })
  },
  created() {
    this.fetchUser();
    if (this.sharedTransactions.length <= 0) {
      this.fetchSharedTransactions();
    }

    this.fetchSharedWithUsers();
  },
  methods: {
    ...mapActions({
      updateUserShared: "shared/updateUserShared",
      fetchSharedTransactions: "shared/fetchSharedTransactions",
      fetchUser: "account/fetchUser",
      fetchSharedWithUsers: "shared/fetchSharedWith"
    }),
    shareProfile(email) {
      console.log(email);
      this.shareDialog = false;
      this.updateUserShared({ email: email, name: this.user.name });
    },
    getSharedTransactions() {
      this.fetchSharedTransactions();
    },
    toCurrency(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style>
</style>