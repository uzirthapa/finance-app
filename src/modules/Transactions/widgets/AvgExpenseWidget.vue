<template>
  <v-flex xs12>
    <v-card outlined>
      <v-card-title v-if="userIncomeRange">
        <v-layout wrap>
          <v-flex xs12>
            <div class="overline">AVG SPENDING</div>
          </v-flex>
          <v-flex xs12>
            <div>$ {{toCurrency(userIncome.avg.toFixed(2))}}</div>
          </v-flex>
        </v-layout>
        <v-spacer />
        <v-avatar>
          <v-icon color="green">mdi-arrow-top-right</v-icon>
        </v-avatar>
      </v-card-title>
      <v-card-title v-else>
        <v-layout wrap>
          <v-flex xs12>
            <div class="overline">AVG SPENDING</div>
          </v-flex>
        </v-layout>
      </v-card-title>

      <v-card-text
        v-if="userIncomeRange"
      >This represents the average spending of the month from the users of the app in your income range.</v-card-text>

      <v-card-text v-else>
        <v-btn class="mb-3" outlined block large @click="getIncomeRanges">Add Income Range</v-btn>Add your income range to see the average spending of users in the same income range.
      </v-card-text>
    </v-card>

    <v-dialog v-model="incomeDialog">
      <v-card>
        <v-card-title>
          <div>Income Range</div>
          <v-spacer />
          <v-btn icon @click="incomeDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="userIncomeRange"
            :items="incomeRanges"
            item-text="amount"
            return-object
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="changeUserIncome(userIncomeRange)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      incomeDialog: false,
      userIncomeRange: null
    };
  },
  watch: {
    userIncome: {
      handler(newValue, oldValue) {
        console.log(this.userIncomeRange);
        this.userIncomeRange = newValue;
      }
    }
  },
  computed: {
    ...mapGetters({
      // avgSpending: "transactions/avgSpending",
      user: "account/user",
      userIncome: "account/userIncome",
      incomeRanges: "account/incomeRanges"
    })
  },
  created() {
    console.log(this.userIncome);
    this.fetchUser();
    this.fetchAvgSpending();
  },
  methods: {
    ...mapActions({
      // fetchAvgSpending: "transactions/fetchAvgSpending",
      fetchUser: "account/fetchUser",
      fetchIncomeRanges: "account/fetchIncomeRanges",
      updateUserIncome: "account/updateUserIncome",
      fetchUserIncome: "account/fetchUserIncome"
      // fetchAvgSpending: "transactions/fetchAvgSpending"
    }),
    toCurrency(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    changeUserIncome(spendingCategory) {
      this.incomeDialog = false;
      console.log(spendingCategory.id);
      this.updateUserIncome(spendingCategory.id).then(() => {
        this.fetchUserIncome(spendingCategory.id);
        this.fetchAvgSpending(spendingCategory.id);
      });
    },
    getIncomeRanges() {
      this.fetchIncomeRanges();
      this.incomeDialog = true;
    }
  }
};
</script>

<style>
</style>