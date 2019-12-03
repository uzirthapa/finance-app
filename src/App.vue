<template>
  <v-app>
    <f-base-toolbar />

    <v-content>
      <f-base-transition>
        <router-view />
      </f-base-transition>

      <v-snackbar v-model="snackbar" top multi-line :timeout="timeout">{{ text }}</v-snackbar>
    </v-content>
    <f-base-bottom-nav />
  </v-app>
</template>

<script>
import FBaseToolbar from "./Base/components/FBaseToolbar";
import FBaseBottomNav from "./Base/components/FBaseBottomNav";
import FBaseTransition from "./Base/components/FBaseTransition";
import { bus } from "./main";
export default {
  name: "App",
  components: {
    FBaseToolbar,
    FBaseBottomNav,
    FBaseTransition
  },
  data: () => ({
    snackbar: false,
    text: "",
    timeout: 5000
  }),
  created() {
    bus.$on("show-snackbar", data => {
      this.snackbar = true;
      this.text = data;
    });
  }
};
</script>
