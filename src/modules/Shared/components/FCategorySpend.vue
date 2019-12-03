<template>
  <v-layout wrap>
    <v-flex xs12></v-flex>
    <v-flex xs12>
      <v-card outlined>
        <v-list-item>
          <v-list-item-avatar color="grey">{{userTransactions.name[0]}}</v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{userTransactions.name}}</v-list-item-title>
            <v-list-item-subtitle>Shared with you</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-card-title> -->
        <!-- <v-layout wrap> -->
        <!-- <v-flex xs12> -->
        <div class="overline pl-4 pt-4">SPENDING CATEGORIES</div>
        <!-- </v-flex> -->
        <!-- </v-layout> -->
        <!-- </v-card-title> -->
        <v-list>
          <template v-for="(category, i) in topSpendCategories">
            <!-- <v-layout wrap > -->
            <v-list-item :key="i">
              <v-list-item-avatar :color="category.icon.color">
                <v-icon dark v-text="category.icon.icon"></v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{category.name}}</v-list-item-title>
                <v-list-item-subtitle>{{category.count}} Transactions</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>Amount</v-list-item-action-text>
                <div
                  v-if="category.amount < 0"
                  class="green--text"
                >$ {{toCurrency(category.amount)}}</div>
                <div v-else>$ {{toCurrency(category.amount)}}</div>
              </v-list-item-action>
            </v-list-item>
            <!-- <v-divider :key="`divider${i}`" /> -->
            <!-- </v-layout> -->
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    userTransactions: {
      type: Object,
      default: function() {
        return {};
      }
    },
    icons: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    transactions() {
      if (this.userTransactions.transactions.length == 0) {
        return [];
      }
      var array = [];

      for (var i = 0; i < this.userTransactions.transactions.length; i++) {
        array = array.concat(this.userTransactions.transactions[i]);
      }
      return array;
    },
    categories() {
      if (this.transactions.length == 0) {
        return [];
      }
      var categories = [];
      console.log(this.userTransactions);
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
      if (this.transactions.length == 0) {
        return [];
      }
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
    console.log(this.userTransactions);
  },
  methods: {
    toCurrency(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style>
</style>