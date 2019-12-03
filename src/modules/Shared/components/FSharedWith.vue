<template>
  <v-container class="pa-0">
    <v-layout class="mb-3">
      <v-flex>
        <div class="title">Profile shared with:</div>
      </v-flex>
    </v-layout>
    <v-card outlined>
      <v-list>
        <template v-for="(user, i) in sharedWithUsers">
          <v-list-item :key="i">
            <v-list-item-content>
              <v-list-item-title>
                <div>{{user.email}}</div>
              </v-list-item-title>
              <v-list-item-subtitle>Email</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>Status</v-list-item-action-text>
              <div v-if="user.pending">Pending</div>
              <div v-if="user.accepted">Accepted</div>
              <div v-if="user.declined">Declined</div>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    sharedWithUsers: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style>
</style>