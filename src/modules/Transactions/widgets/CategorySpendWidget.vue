<template>
  <v-flex xs12>
    <v-card outlined>
      <!-- <v-card-title> -->
      <!-- <v-layout wrap> -->
      <!-- <v-flex xs12> -->
      <div class="overline pl-4 pt-4">CATEGORIES</div>
      <!-- </v-flex> -->
      <!-- </v-layout> -->
      <!-- </v-card-title> -->
      <v-skeleton-loader
        v-if="this.transactions.length == 0"
        ref="skeleton"
        :boilerplate="boilerplate"
        :type="type"
        :tile="tile"
        class="mx-auto"
      ></v-skeleton-loader>
      <v-list>
        <template v-for="(category, i) in topSpendCategories">
          <!-- <v-layout wrap > -->
          <v-list-item
            :key="i"
            :to="{path: '/dashboard/transactions', query: {category: category.name}}"
          >
            <v-list-item-avatar :color="category.icon.color">
              <v-icon dark v-text="category.icon.icon"></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{category.name}}</v-list-item-title>
              <v-list-item-subtitle>{{category.count}} Transactions</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>Amount</v-list-item-action-text>
              <div v-if="category.amount < 0" class="green--text">$ {{toCurrency(category.amount)}}</div>
              <div v-else>$ {{toCurrency(category.amount)}}</div>
            </v-list-item-action>
          </v-list-item>
          <!-- <v-divider :key="`divider${i}`" /> -->
          <!-- </v-layout> -->
        </template>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

// const icons = [
//   { category: "Travel", icon: "mdi-earth", color: "blue" },
//   { category: "Food and Drink", icon: "mdi-food", color: "orange " },
//   { category: "Payment", icon: "mdi-credit-card-outline", color: "green" },
//   { category: "Shops", icon: "mdi-basket", color: "red darken-3" },
//   { category: "Transfer", icon: "mdi-cash-usd", color: "yellow " },
//   { category: "Recreation", icon: "mdi-star", color: "pink" }
// ];

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
      icons: "transactions/icons",
      transactions: "transactions/transactions",
      institutions: "transactions/institutions",
      dateRange: "transactions/dateRange"
    }),
    categories() {
      var categories = [];
      console.log(this.transactions);
      this.transactions.forEach(transaction => {
        for (var i = 0; i < transaction.transactions.length; i++) {
          if (
            categories.indexOf(transaction.transactions[i].category[0]) == -1
          ) {
            categories.push(transaction.transactions[i].category[0]);
          }
        }
      });

      console.log(categories);
      return categories;
    },
    topSpendCategories() {
      var topSpendCategories = [];
      for (var j = 0; j < this.categories.length; j++) {
        var total = 0;
        var catCount = 0;
        this.transactions.forEach(transaction => {
          for (var i = 0; i < transaction.transactions.length; i++) {
            if (this.categories[j] == transaction.transactions[i].category[0]) {
              // console.log(this.categories[j]);
              total += transaction.transactions[i].amount;
              catCount += 1;
              // console.log(this.transactions[i].amount);
            }
          }
        });
        // console.log(this.categories[j]);
        // console.log(total);
        var vm = this;
        var icon = this.icons.find(function(element) {
          if (element.category === vm.categories[j]) {
            return element.icon;
          }
          return 0;
        });

        topSpendCategories.push({
          name: this.categories[j],
          amount: total.toFixed(2),
          count: catCount,
          icon: icon
        });
      }
      // sort by amount
      topSpendCategories = topSpendCategories.sort(function(a, b) {
        return b.amount - a.amount;
      });

      // console.log(topSpendCategories);
      return topSpendCategories;
    }
  },
  created() {
    // if (this.transactions.length === 0) {
    //   this.fetchInstitutions().then(res => {
    //     console.log(res);
    //     console.log(this.institutions);
    //     this.institutions.forEach(institution => {
    //       this.fetchTransactions({
    //         inst: institution.id,
    //         start: null,
    //         end: null
    //       });
    //     });
    //   });
    // }
    var vm = this;
    setTimeout(function() {
      vm.updateTotalSpending();
    }, 5000);
  },
  methods: {
    ...mapActions({
      fetchInstitutions: "transactions/fetchInstitutions",
      fetchTransactions: "transactions/fetchTransactions",
      updateTotalSpending: "transactions/updateTotalSpending"
    }),
    toCurrency(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style>
</style>