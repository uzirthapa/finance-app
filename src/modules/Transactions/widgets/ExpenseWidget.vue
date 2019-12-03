<template>
  <v-flex xs12>
    <v-card outlined v-if="this.transactions.length == 0">
      <v-card-title class="pb-0">
        <v-layout wrap>
          <v-flex xs12>
            <div class="overline">TOTAL SPENDING</div>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-skeleton-loader
        ref="skeleton"
        :boilerplate="boilerplate"
        :type="type"
        :tile="tile"
        class="mx-auto"
      ></v-skeleton-loader>
    </v-card>
    <v-card outlined v-else>
      <v-card-title class="pb-0">
        <v-layout wrap>
          <v-flex xs12>
            <div class="overline">TOTAL SPENDING</div>
          </v-flex>

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

          <!-- <router-link to="/total-spending"> -->
          <!-- <v-layout> -->
          <v-flex>
            <div>$ {{toCurrency(expense.toFixed(2))}}</div>
          </v-flex>
          <v-flex class="text-right">
            <v-avatar>
              <v-icon color="red">mdi-arrow-top-right</v-icon>
            </v-avatar>
          </v-flex>
          <!-- </v-layout> -->
          <!-- </router-link> -->
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <div
          class="px-3 pb-2 body-2 grey--text text--darken-1"
        >Your total spending is up 5% from last month!</div>
        <v-spacer />
        <v-btn
          outlined
          color="accent"
          :to="{path: '/dashboard/total-spending', query: {date: transactions[0].transactions[0].date}}"
        >Detail</v-btn>
      </v-card-actions>
      <!-- <v-card-text>5 % up from last month! :(</v-card-text> -->
    </v-card>
  </v-flex>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      currentDate: null,
      boilerplate: false,
      tile: false,
      type: "list-item-avatar-three-line",
      types: []
    };
  },
  computed: {
    ...mapGetters({
      transactions: "transactions/transactions",
      totalSpending: "transactions/totalSpending"
      // currentDate: "transactions/currentDate"
    }),
    expense() {
      var total = 0;
      if (this.transactions.length > 0) {
        this.transactions.forEach(transaction => {
          total += transaction.transactions.reduce(function(
            accumulator,
            currentValue
          ) {
            return accumulator + currentValue.amount;
          },
          0);
        });
        this.setTotalSpending(total);
      }

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
    console.log(this.currentDate);
    if (this.currentDate == null) {
      console.log(this.currentDate);
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
      // this.setCurrentDate(date);
      // this.changeMonth(this.currentDate);
    }
  },
  methods: {
    ...mapMutations({
      setTotalSpending: "transactions/setTotalSpending"
    }),
    ...mapActions({
      updateTotalSpending: "transactions/updateTotalSpending",
      setCurrentDate: "transactions/setCurrentDate"
    }),
    toCurrency(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    changeMonth(month) {
      this.$emit("change-month", month);
    }
  }
};
</script>

<style>
.v-text-field.v-text-field--enclosed {
  height: 50px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  padding: 0px;
}
</style>