<template>
  <v-container>
    <v-layout wrap>
      <v-flex text-center>
        <v-avatar :color="getIcon(category).color" size="70">
          <v-icon dark large>{{getIcon(category).icon}}</v-icon>
        </v-avatar>
        <div class="headline font-weight-medium mt-3">{{category}}</div>
        <div class="body-2 grey--text">{{categoryTransactions.length}} Transactions</div>
      </v-flex>
    </v-layout>
    <v-layout class="mt-3" wrap>
      <v-flex xs12>
        <div class="title">{{getDate.month}} {{getDate.year}}</div>
      </v-flex>
      <v-flex class="mt-2">
        <v-card outlined>
          <v-list>
            <template v-for="(transaction, i) in categoryTransactions">
              <v-card flat :key="i">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{transaction.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{convertDate(transaction.date)}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>Amount</v-list-item-action-text>
                    $ {{toCurrency(transaction.amount.toFixed(2))}}
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
              </v-card>
            </template>

            <!-- <v-divider /> -->
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapGetters, mapState, mapActions } from "vuex";
import helpers from "@/Base/mixins/helpers";
export default {
  mixins: [helpers],
  data() {
    return {
      category: null,
      count: 0
    };
  },
  computed: {
    ...mapGetters({
      transactions: "transactions/transactions",
      icons: "transactions/icons",
      dateRange: "transactions/dateRange"
    }),
    getDate() {
      var date = {
        month: moment(this.dateRange.start).format("MMM"),
        year: moment(this.dateRange.start).format("YYYY")
      };
      return date;
    },
    categoryTransactions() {
      var array = [];
      console.log(this.transactions);
      this.transactions.forEach(transaction => {
        array = array.concat(
          transaction.transactions.filter(transaction => {
            console.log(transaction);
            if (this.category === transaction.category[0]) {
              return transaction;
            }
          })
        );
      });

      console.log(array);
      return array;
      //   return  []
      //   return this.transactions.filter(transaction => {
      //     console.log(transaction);
      //     transaction.transactions.filter()
      //     if (this.category === transaction.category[0]) {
      //       return transaction;
      //     }
      //   });
    }
  },
  created() {
    this.category = this.$route.query.category;
  },
  methods: {
    getIcon(category) {
      return this.icons.find(icon => {
        console.log(icon);
        if (icon.category === category) {
          return icon;
        }
      });
    },
    toCurrency(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style>
</style>