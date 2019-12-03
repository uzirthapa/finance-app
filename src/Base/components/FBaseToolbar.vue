<template>
  <v-app-bar app color="primary" dark class="pt-5" height="100px">
    <div class="d-flex align-center">
      <transition name="scale-transition">
        <div
          v-if="currentRoute.path == '/dashboard' || currentRoute.path == '/account' || currentRoute.path == '/shared' || currentRoute.path == '/notifications' || currentRoute.path == '/auth'"
        >
          <v-layout wrap align-center>
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              width="40"
            />
            <div class="title">{{currentRoute.name}}</div>
          </v-layout>
        </div>

        <div v-else class="title">
          <v-layout wrap align-center>
            <v-btn icon @click="back">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            {{currentRoute.name}}
          </v-layout>
        </div>
      </transition>

      <!-- <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />-->
    </div>

    <!-- <v-spacer></v-spacer> -->

    <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>-->
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
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
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>