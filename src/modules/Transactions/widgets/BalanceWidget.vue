<template>
  <v-flex xs12>
    <v-card outlined>
      <v-card-title class="pb-0">
        <v-layout wrap>
          <v-flex xs12>
            <div class="overline">CURRENT BALANCE</div>
          </v-flex>
          <v-flex xs12 v-if="totalBalance != 0">
            <div>$ {{toCurrency(totalBalance.toFixed(2))}}</div>
          </v-flex>
        </v-layout>
        <v-spacer />
        <v-avatar>
          <v-icon color="green">mdi-cash</v-icon>
        </v-avatar>
      </v-card-title>
      <v-skeleton-loader
        v-if="totalBalance == 0"
        ref="skeleton"
        :boilerplate="boilerplate"
        :type="type"
        :tile="tile"
        class="mx-auto"
      ></v-skeleton-loader>
      <!-- <v-card-text class="pb-0">5 % up from last month! Keep it up!</v-card-text> -->
      <v-list class="pt-0">
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-title>
              <div>Accounts</div>
            </v-list-item-title>
          </template>
          <template v-for="(account, i) in accounts">
            <v-list-item :key="i">
              <v-list-item-content>
                <v-list-item-title>{{account.name}}</v-list-item-title>
                <div class="caption">{{account.official_name}}</div>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>Balance</v-list-item-action-text>
                $ {{toCurrency(account.balances.current.toFixed(2))}}
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      boilerplate: false,
      tile: false,
      type: "list-item-avatar-three-line",
      types: []
    };
  },
  computed: {
    ...mapGetters({
      balance: "transactions/balance",
      institutions: "transactions/institutions"
    }),
    totalBalance() {
      var totalBalance = 0;
      this.balance.forEach(item => {
        item.data.accounts.forEach(function(account) {
          totalBalance += account.balances.available;
        });
      });
      return totalBalance;
    },
    accounts() {
      var accounts = [];
      console.log(this.balance);
      this.balance.forEach(item => {
        // console.log(item.data.accounts);

        accounts = accounts.concat(item.data.accounts);
      });
      console.log(accounts);
      return accounts;
    }
  },
  created() {
    if (this.balance.length === 0) {
      this.fetchInstitutions().then(res => {
        console.log(res);
        console.log(this.institutions);
        this.institutions.forEach(institution => {
          this.fetchBalance(institution.id);
        });
      });
    }
  },
  methods: {
    ...mapActions({
      fetchBalance: "transactions/fetchBalance",
      fetchInstitutions: "transactions/fetchInstitutions"
    }),
    toCurrency(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style>
</style>