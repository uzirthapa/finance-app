<template>
  <v-card>
    <v-card-title>
      <div>Share Profile</div>
      <v-spacer />
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field :rules="emailRules" placeholder="Email" v-model="email" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="share">Share</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    close() {
      this.email = "";
      this.$emit("close");
    },
    share() {
      if (this.$refs.form.validate()) {
        this.$emit("share", this.email);
        this.email = "";
      }
    }
  }
};
</script>

<style>
</style>