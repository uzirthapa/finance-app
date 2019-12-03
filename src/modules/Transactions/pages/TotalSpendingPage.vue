<template>
  <v-container>
    <v-card outlined>
      <v-card-title>
        <div class="overline">Total Spending</div>
        <v-flex>
          <v-select
            solo
            flat
            class="px-0"
            height="20px"
            :items="getMonths"
            item-text="month"
            v-model="currentDate"
            return-object
            @change="changeMonth"
          >
            <template v-slot:item="data">
              <v-layout>
                <v-flex>{{data.item.month}} {{data.item.year}}</v-flex>
              </v-layout>
            </template>
            <template v-slot:selection="data">
              <v-layout>
                <v-flex class="title">{{data.item.month}} {{data.item.year}}</v-flex>
              </v-layout>
            </template>
          </v-select>
          <!-- <div class="title">March 2019</div> -->
        </v-flex>
      </v-card-title>
      <!-- {{topSpendCategories}} -->
      <!-- {{allTransactions[0].category[0]}}
      {{getIcon(allTransactions[0].category[0])}}-->
      <v-card-text>
        <vc-donut
          :thickness="35"
          :has-legend="true"
          :total="totalSpending"
          :sections="sections"
        >$ {{toCurrency(totalSpending.toFixed(2))}}</vc-donut>
      </v-card-text>
      <v-list>
        <v-list-item v-for="(transaction, i) in allTransactions" :key="i">
          <v-list-item-content>
            <v-list-item-title>{{transaction.name}}</v-list-item-title>
            <v-list-item-subtitle>{{convertDate(transaction.date)}}</v-list-item-subtitle>
            <v-list-item-subtitle
              class="overline"
              :style="`color:${getIcon(transaction.category[0]).color}`"
            >{{transaction.category[0]}}</v-list-item-subtitle>
            <!-- <v-list-item-subtitle>{{getIcon(transaction.category[0]).color}}</v-list-item-subtitle> -->
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>Amount</v-list-item-action-text>
            $ {{toCurrency(transaction.amount.toFixed(2))}}
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <!-- {{transactions[0].transactions}} -->
      <!-- {{allTransactions}} -->
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import helpers from "@/Base/mixins/helpers";
export default {
  mixins: [helpers],
  data() {
    return {
      currentDate: null,
      transactionDate: null
      //   sections: [{ value: 25 }, { value: 25 }]
    };
  },
  computed: {
    ...mapGetters({
      transactions: "transactions/transactions",
      institutions: "transactions/institutions",
      icons: "transactions/icons"
    }),
    allTransactions() {
      var array = [];
      this.transactions.forEach(transaction => {
        array = array.concat(transaction.transactions);
        console.log(transaction.transactions);
      });
      return array;
    },
    sections() {
      var array = [];
      this.topSpendCategories.forEach(category => {
        array.push({
          value: category.amount,
          color: category.icon.color,
          label: category.name
        });
      });
      return array;
    },

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
    },

    totalSpending() {
      var total = 0;
      this.transactions.forEach(transaction => {
        total += transaction.transactions.reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.amount;
        },
        0);
      });
      //   this.setTotalSpending(total);
      return total;
    },
    getMonths() {
      var dateStart = moment().subtract(11, "months");
      var dateEnd = moment();
      var interim = dateStart.clone();
      var timeValues = [];

      while (dateEnd > interim || interim.format("M") === dateEnd.format("M")) {
        // if (interim.month == moment().month) {
        // timeValues.push({
        //   month: interim.format("MMM"),
        //   year: interim.format("YYYY"),
        //   start: interim.startOf("month").format("YYYY-MM-DD"),
        //   end: moment()
        //     .endOf("month")
        //     .format("YYYY-MM-DD")
        // });
        // } else {
        timeValues.push({
          month: interim.format("MMM"),
          year: interim.format("YYYY"),
          start: interim.startOf("month").format("YYYY-MM-DD"),
          end: interim.endOf("month").format("YYYY-MM-DD")
        });
        // }

        interim.add(1, "month");
      }
      console.log(timeValues);
      return timeValues.reverse();
    }
  },
  created() {
    this.transactionDate = this.$route.query.date;
    console.log(this.transactionDate);

    if (this.$route.query == null) {
      this.currentDate = {
        month: moment().format("MMM"),
        year: moment().format("YYYY"),
        start: moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        end: moment()
          .endOf("month")
          .format("YYYY-MM-DD")
      };
      this.changeMonth(this.currentDate);
    } else {
      this.currentDate = {
        month: moment(this.$route.query.date).format("MMM"),
        year: moment(this.$route.query.date).format("YYYY"),
        start: moment(this.$route.query.date)
          .startOf("month")
          .format("YYYY-MM-DD"),
        end: moment(this.$route.query.date)
          .endOf("month")
          .format("YYYY-MM-DD")
      };
    }
  },
  methods: {
    ...mapActions({
      updateDateRange: "transactions/updateDateRange",
      fetchTransactions: "transactions/fetchTransactions",
      fetchInstitutions: "transactions/fetchInstitutions",
      resetTransactions: "transactions/resetTransactions"
    }),
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
    },
    changeMonth(month) {
      console.log(month);
      this.updateDateRange({ start: month.start, end: month.end });
      this.resetTransactions();
      this.fetchInstitutions().then(res => {
        console.log(res);
        console.log(this.institutions);
        this.institutions.forEach(institution => {
          this.fetchTransactions({
            inst: institution,
            start: month.start,
            end: month.end
          });
        });
      });
    }
  }
};
</script>

<style>
</style>