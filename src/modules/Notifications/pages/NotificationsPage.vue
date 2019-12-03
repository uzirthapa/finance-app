<template>
  <v-container>
    <v-card outlined v-if="requests.length == 0">
      <v-card-text class="text-center">You are up to date! :)</v-card-text>
    </v-card>
    <v-list v-else>
      <template v-for="(request, i) in requests">
        <v-card flat :key="i">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <div>Notification From {{request.name}}</div>
              </v-list-item-title>
              <v-list-item-subtitle>{{request.name}} wants to share their profile with you</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-row>
              <v-col class="py-0">
                <v-btn block outlined color="green" @click="accept(request.id)">Accept</v-btn>
              </v-col>
              <v-col class="py-0">
                <v-btn block outlined color="red" @click="decline(request.id)">Decline</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-divider />
        </v-card>
      </template>
      <!-- {{requests}} -->
    </v-list>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      requests: "notifications/requests"
    })
  },
  created() {
    this.fetchSharedRequests();
  },
  methods: {
    ...mapActions({
      fetchSharedRequests: "notifications/fetchSharedRequests",
      acceptSharedRequest: "notifications/acceptSharedRequest",
      declineSharedRequest: "notifications/declineSharedRequest"
    }),
    accept(id) {
      console.log(id);
      this.acceptSharedRequest(id);
    },
    decline(id) {
      console.log(id);
      this.declineSharedRequest(id);
    }
  }
};
</script>

<style>
</style>