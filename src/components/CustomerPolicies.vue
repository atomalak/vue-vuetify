<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          color="red"
          dark
          v-on="on"
         
          >Poliçe</v-btn
        >
      </template>
      <v-card class="mx-auto" width="600">
        <v-list three-line>
          <v-list-group :value="true">
            <template v-slot:activator>
              <v-list-item-title
                >{{ customerinfo.name }}
                {{ customerinfo.surname }}</v-list-item-title
              >
            </template>

            <v-list-group :value="true" no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      customerPolicies.length > 0
                        ? "Müşterinin Poliçeleri "
                        : "Herhangi Bir Poliçesi Bulunamamıştır."
                    }}</v-list-item-title
                  >
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(customerPolicies, i) in customerPolicies"
                :key="i"
                link
              >
                <v-list-item-title class="mb-10"
                  >{{ customerPolicies.policyname }}<br />
                  <v-btn
                    color="red"
                    dark
                    @click="removePolicies(customerPolicies.policyId)"
                    >Sil</v-btn
                  >
                </v-list-item-title>
                <v-list-item-subtitle class="text--primary">
                  Poliçe Başlangıç Tarihi: {{ customerPolicies.policyStartDate
                  }}<br />
                  Poliçe Bitiş Tarihi: {{ customerPolicies.policyEndDate }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { getCustomerPolicies, removePolicyFromCustomer } from "../storage";
export default {
  props: ["customerinfo"],
  data: (vm) => ({
    dialog: false,
    name: "",
    customerPolicies: [],
  }),
  methods: {
    removePolicies(id) {
      removePolicyFromCustomer(id, this.customerinfo.id);
      this.customerPolicies = getCustomerPolicies(this.customerinfo.id);
    },
  },
 
  watch: {
    dialog(value) {
      if (value) {
        this.customerPolicies = getCustomerPolicies(this.customerinfo.id);
      }
    },
  },
};
</script>