<template>
  <div class="fill-height">
    <v-container class="fill-height" v-if="institutions.length == 0">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-flex class="text-center">
            <div class="mb-3 grey--text">Connect an Account to get started</div>

            <f-plaid-link
              style="width: 100%"
              env="sandbox"
              publicKey="e18f7143ef846667a84bb797570052"
              clientName="DTM"
              product="transactions"
              v-bind="{ onSuccess }"
            >
              <v-btn block large outlined class="text-none">Add an Account</v-btn>
            </f-plaid-link>
          </v-flex>
        </v-col>
      </v-row>
    </v-container>
    <v-container grid-list-sm v-else>
      <v-layout wrap>
        <balance-widget></balance-widget>
        <avg-expense-widget></avg-expense-widget>

        <expense-widget @change-month="changeMonth"></expense-widget>

        <category-spend-widget></category-spend-widget>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import BalanceWidget from "@/modules/Transactions/widgets/BalanceWidget";
import ExpenseWidget from "@/modules/Transactions/widgets/ExpenseWidget";
import AvgExpenseWidget from "@/modules/Transactions/widgets/AvgExpenseWidget";
import CategorySpendWidget from "@/modules/Transactions/widgets/CategorySpendWidget";
import FPlaidLink from "@/modules/Transactions/components/FPlaidLink";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    BalanceWidget,
    ExpenseWidget,
    AvgExpenseWidget,
    CategorySpendWidget,
    FPlaidLink
  },
  data() {
    return {
      currentDate: null,
      data: null,
      months: [
        { month: "January", year: "2019" },
        { month: "February", year: "2019" },
        { month: "March", year: "2019" },
        { month: "April", year: "2019" },
        { month: "May", year: "2019" },
        { month: "June", year: "2019" },
        { month: "July", year: "2019" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      dateRange: "transactions/dateRange",
      institutions: "transactions/institutions"
    })
  },
  created() {
    if (this.currentDate == null) {
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
    }
  },
  methods: {
    ...mapActions({
      updateDateRange: "transactions/updateDateRange",
      fetchTransactions: "transactions/fetchTransactions",
      fetchInstitutions: "transactions/fetchInstitutions",
      resetTransactions: "transactions/resetTransactions",
      submitNewBankAccessToken: "transactions/submitNewBankAccessToken"
    }),
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
    },
    onSuccess(token, details) {
      let vm = this;
      // console.log(token);
      console.log(details);
      this.data = details;
      console.log(this.data);
      this.submitNewBankAccessToken(this.data);
    }
  }
};
</script>

<style>
</style>