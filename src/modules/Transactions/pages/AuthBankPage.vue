<template>
  <v-container>
    <v-layout wrap>
      <v-flex>
        <div class="title">Link Your Account</div>
      </v-flex>
      <v-flex>
        <v-btn>
          <f-plaid-link
            env="sandbox"
            publicKey="e18f7143ef846667a84bb797570052"
            clientName="Test App"
            product="transactions"
            v-bind="{ onSuccess }"
          >Open Plaid Link</f-plaid-link>
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn @click="fetchTransactions">Get all transactions</v-btn>
      </v-flex>
      <v-flex>
        <v-btn @click="fetchIncome">Get Income</v-btn>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex>
        <v-card width="500px">
          <v-list>
            <v-list-item v-for="(transaction, i) in transactions" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{transaction.name}}</v-list-item-title>
                <v-list-item-subtitle>{{transaction.category[0]}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>Amount</v-list-item-action-text>
                $ {{transaction.amount.toFixed(2)}}
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs5>
        <v-card>
          <v-list>
            <v-list-item v-for="(category, i) in topSpendCategories" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{category.name}}</v-list-item-title>
                <v-list-item-subtitle>{{category.count}} Transactions</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>Amount</v-list-item-action-text>
                $ {{category.amount}}
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex>Expense: $ {{expense}}</v-flex>

      <!-- <v-flex>{{transactions[0]}}</v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import FPlaidLink from "../components/FPlaidLink";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    FPlaidLink
  },
  computed: {
    ...mapGetters({
      transactions: "transactions/transactions"
    }),
    categories() {
      var categories = [];
      for (var i = 0; i < this.transactions.length; i++) {
        if (categories.indexOf(this.transactions[i].category[0]) == -1) {
          categories.push(this.transactions[i].category[0]);
        }
      }
      // console.log(categories);
      return categories;
    },
    topSpendCategories() {
      var topSpendCategories = [];
      for (var j = 0; j < this.categories.length; j++) {
        var total = 0;
        var catCount = 0;
        for (var i = 0; i < this.transactions.length; i++) {
          if (this.categories[j] == this.transactions[i].category[0]) {
            console.log(this.categories[j]);
            total += this.transactions[i].amount;
            catCount += 1;
            console.log(this.transactions[i].amount);
          }
        }
        // console.log(this.categories[j]);
        // console.log(total);
        topSpendCategories.push({
          name: this.categories[j],
          amount: total.toFixed(2),
          count: catCount
        });
      }
      // console.log(topSpendCategories);
      return topSpendCategories;
    },
    expense() {
      return this.transactions.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.amount;
      }, 0);
    }
  },
  methods: {
    ...mapActions({
      submitNewBankAccessToken: "transactions/submitNewBankAccessToken",
      fetchTransactions: "transactions/fetchTransactions",
      fetchIncome: "transactions/fetchIncome"
    }),
    onSuccess(token) {
      let vm = this;
      console.log(token);
      this.submitNewBankAccessToken(token);

      //   this.token = token
      //   axios.post('http://localhost:3000/get_access_token', {
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/vnd.example.v1+json',
      //     },
      //     public_token: token
      //   }).then(response => {
      //     vm.accessToken = response.data.access_token
      //     vm.itemId = response.data.item_id
      //     console.log(response)
      //   }).catch(e => {
      //     console.log(e)
      //   })
    }
  }
};
</script>

<style>
</style>