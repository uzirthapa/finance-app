<template>
  <v-bottom-navigation
    style="padding-bottom: 30px!important"
    height="70px"
    v-model="bottomNav"
    grow
    app
    v-if="currentRoute.path != '/auth'"
  >
    <v-btn to="/" value="recent">
      <span>Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>
    <v-btn value="favorites" to="/shared">
      <span>Profiles</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn value="nearby" to="/notifications">
      <span>Notifications</span>
      <v-icon>mdi-bell-circle</v-icon>
    </v-btn>
    <v-btn to="/account" value="account">
      <span>Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "recent",
      currentRoute: "/"
    };
  },
  watch: {
    $route: {
      handler: function(newRoute, oldRoute) {
        this.currentRoute = newRoute;
        console.log(oldRoute);
        console.log(newRoute);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style>
.footer {
  /* Apply this to v-bottom-nav if necessary. */
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
</style>