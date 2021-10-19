<template>
  <v-container>
    <h1 class="text-center mb-4">Müşteriler</h1>
    <AddUser @saveCustomer="saveCustomer($event)" />
    <v-row v-if="customers.length > 0">
      <v-col md="4" sm="3" lg="4" v-for="customer in customers" :key="customer">
        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
          <v-card-title co> Müşteri Bilgisi </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle> Müşteri Adı: {{ customer.name }} </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-subtitle>
            Müşteri Soyadı: {{ customer.surname }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-subtitle>
            <b>Telefon Bilgisi:</b> {{ customer.phone }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-actions>
            <v-toolbar dense>
              <CustomerPolicies
                :customerinfo="customer"
                :customerPolicies="customerPolicies"
              />
              <NewCustomerPolicy :customerinfo="customer" />
            </v-toolbar>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" lg="12">
        <v-alert type="info"> Herhangi Bir Müşteri Kaydı Yoktur </v-alert>
      </v-col>
    </v-row>
    <v-app-bar> </v-app-bar>
  </v-container>
</template>
<script>
import AddUser from "@/components/AddUser";
import NewCustomerPolicy from "@/components/NewCustomerPolicy";
import CustomerPolicies from "@/components/CustomerPolicies";
import { saveCustomer, getCustomers, getCustomerPolicies } from "../storage";
export default {
  props: ["searchValue", "newPolicyAdded"],
  data() {
    return {
      customers: [],
      copyCustomers: [],
      customerPolicies: [],
    };
  },
  components: {
    AddUser,
    NewCustomerPolicy,
    CustomerPolicies,
  },
  methods: {
    saveCustomer(data) {
      if (!data.name) {
        this.$emit("event", "Müşterinin Adını Kontrol Ediniz");
        return;
      }

      if (!data.surname) {
        this.$emit("event", "Müşterinin Soyadını Kontrol Ediniz");
        return;
      }
      if (!data.phone || data.phone.length > 11) {
        this.$emit("event", "Girilen Telefon Numarasını Kontrol Ediniz");
        return;
      }

      if (!data.tc || data.tc.length > 11) {
        this.$emit("event", "Girilen TC kimlik numarasınız Kontrol Ediniz");
        return;
      }

      this.customers.push(data);
      saveCustomer(this.customers);
      this.$emit("event", "Yeni Müşteri Eklendi");
      this.copyCustomers = JSON.parse(JSON.stringify(this.customers));
    },
  },
  mounted() {
    this.customers = getCustomers();
    this.copyCustomers = JSON.parse(JSON.stringify(this.customers));
  },
  watch: {
    searchValue(val) {
      if (val.length > 2) {
        this.customers = this.customers.filter((customer) => {
          return (
            customer.name
              .toLocaleLowerCase()
              .indexOf(val.toLocaleLowerCase()) >= 0
          );
        });
        if (this.customers.length == 0) {
          this.customers = JSON.parse(JSON.stringify(this.copyCustomers));
          this.$emit("event", "Aradığınıza Uygun Kayıt Bulunamadı");
        }
      } else {
        this.customers = JSON.parse(JSON.stringify(this.copyCustomers));
      }
    },
    newPolicyAdded(val) {
      if (val) {
      }
    },
  },
};
</script>