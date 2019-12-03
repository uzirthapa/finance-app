<template>
  <v-container grid-list-xs>
    <v-layout wrap>
      <v-flex xs12>
        <div class="title">Profile</div>
      </v-flex>
      <v-flex xs12>
        <v-card outlined>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{user.name}}</v-list-item-title>
                <v-list-item-subtitle>Name</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{user.email}}</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>password</v-list-item-title>
                <v-list-item-subtitle>Password</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Income Range</v-list-item-title>
                <v-list-item-subtitle>{{userIncome.amount}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="getIncomeRanges">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <!-- <v-divider /> -->
            <!-- <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Share</v-list-item-title>
                <v-list-item-subtitle>Share my profile anonymously</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="checkBox"></v-checkbox>
              </v-list-item-action>
            </v-list-item>-->
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 mt-3>
        <v-layout>
          <v-flex>
            <div class="title">Accounts</div>
          </v-flex>
          <v-flex class="text-right">
            <v-btn icon @click="edit = !edit">
              <v-icon v-if="edit">mdi-pencil-off</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-card outlined>
          <v-card-text v-if="institutions.length == 0" class="text-center">
            <div>No Accounts :(</div>
            <div>Add an account to get started!</div>
          </v-card-text>
          <v-list v-else>
            <template v-for="(inst, i) in institutions">
              <v-list-item :key="i">
                <v-list-item-avatar v-if="edit">
                  <v-btn icon @click="removeBankDialog(inst)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{inst.institution.name}}</v-list-item-title>
                  <v-list-item-subtitle>Connected</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>Status</v-list-item-action-text>
                  <v-icon color="green">mdi-check</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 mt-3>
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
      <v-flex xs12 mt-4 text-center>
        <div class="grey--text caption">All your information is kept strictly private.</div>
      </v-flex>
      <v-flex xs12 mt-5>
        <v-btn large block outlined color="red" @click="logout">Log out</v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="acctDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>

        <v-card-text>Remember that once you disconnect your account you will not have accurate spending and income represented on your dashboard. Do you still want to continue?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="acctDialog = false">No</v-btn>

          <v-btn color="red darken-1" text @click="removeBankAcct">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </v-container>
</template>

<script>
import FPlaidLink from "@/modules/Transactions/components/FPlaidLink";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    FPlaidLink
  },
  data() {
    return {
      edit: false,
      acctDialog: false,
      incomeDialog: false,
      checkBox: true,
      data: null,
      selectedAcct: null,
      userIncomeRange: null
    };
  },
  watch: {
    userIncome: {
      handler(newValue, oldValue) {
        this.userIncomeRange = newValue;
      }
    }
  },
  computed: {
    ...mapGetters({
      institutions: "transactions/institutions",
      user: "account/user",
      incomeRanges: "account/incomeRanges",
      userIncome: "account/userIncome"
    })
  },
  created() {
    this.fetchInstitutions();
    this.fetchUser();
    console.log(this.userIncome);
    // this.userIncomeRange = this.userIncome;
  },
  methods: {
    ...mapActions({
      submitNewBankAccessToken: "transactions/submitNewBankAccessToken",
      fetchInstitutions: "transactions/fetchInstitutions",
      fetchUser: "account/fetchUser",
      fetchIncomeRanges: "account/fetchIncomeRanges",
      fetchUserIncome: "account/fetchUserIncome",
      updateUserIncome: "account/updateUserIncome",
      fetchAvgSpending: "transactions/fetchAvgSpending",
      userSignOut: "auth/userSignOut",
      removeAccount: "transactions/removeAccount"
    }),
    getIncomeRanges() {
      this.fetchIncomeRanges();
      this.incomeDialog = true;
    },

    onSuccess(token, details) {
      let vm = this;
      // console.log(token);
      console.log(details);
      this.data = details;
      console.log(this.data);
      this.submitNewBankAccessToken(this.data);
    },
    changeUserIncome(spendingCategory) {
      this.incomeDialog = false;
      console.log(spendingCategory.id);
      this.updateUserIncome(spendingCategory.id).then(() => {
        this.fetchUserIncome(spendingCategory.id);
        this.fetchAvgSpending(spendingCategory.id);
      });
    },
    removeBankDialog(bankData) {
      this.acctDialog = true;
      console.log(bankData);
      this.selectedAcct = bankData;
      console.log(this.selectedAcct);
    },
    removeBankAcct() {
      console.log("Acct: ", this.selectedAcct);
      this.acctDialog = false;
      this.removeAccount(this.selectedAcct.institution.institution_id);
    },
    logout() {
      this.userSignOut();
    }
  }
};
</script>

<style>
</style>