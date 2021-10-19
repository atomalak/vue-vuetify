<template>
  <v-container>
    <h1 class="text-center mb-4">Müşteriler</h1>
    <AddUser
      @saveCustomer="saveCustomer($event)"
      @click="pageType = 'newrecord'"
      :pageType="pageType"
      :updateCustomer="updateCustomerInfo"
      @updateProps="updateProps"
      @updateCustomerInfoEvent="updateCustomerInfoEvent"
      ref="adduser"
    />
    <v-row v-if="customers.length > 0">
      <v-col md="4" sm="3" lg="4" v-for="customer in customers" :key="customer">
        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
          <v-card-title co> Müşteri Bilgisi </v-card-title>
          <v-divider></v-divider>
          <v-card-title> Müşteri Adı: {{ customer.name }} </v-card-title>
          <v-divider></v-divider>
          <v-card-title> Müşteri Soyadı: {{ customer.surname }} </v-card-title>
          <v-divider></v-divider>
          <v-card-title>
            <b>Telefon Bilgisi:</b> {{ customer.phone }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-toolbar>
              <CustomerPolicies
                :customerinfo="customer"
                :customerPolicies="customerPolicies"
                @detailPolicies="detailPolicies"
              />
            </v-toolbar>
          </v-card-actions>
          <v-card-actions>
            <v-toolbar>
              <NewCustomerPolicy
                :customerinfo="customer"
                :policyInfo="policyInfo"
                ref="newCustomerPolicy"
                @updateProps="updateProps"
              />
            </v-toolbar>
          </v-card-actions>

          <v-card-actions>
            <v-toolbar>
              <v-btn color="orange" block @click="updateCustomer(customer)"
                >Müşteri Güncelle</v-btn
              >
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
import { saveCustomer, getCustomers, updateCustomerStorage } from "../storage";
export default {
  props: ["searchValue", "newPolicyAdded"],
  data() {
    return {
      customers: [],
      copyCustomers: [],
      customerPolicies: [],
      pageType: "newrecord",
      updateCustomerInfo: null,
      policyInfo: null,
    };
  },
  components: {
    AddUser,
    NewCustomerPolicy,
    CustomerPolicies,
  },
  methods: {
    detailPolicies(data) {
      this.$refs.newCustomerPolicy[0].$refs.opencreatemodal.$el.click();
      this.policyInfo = data;
    },
    updateProps() {
      this.pageType = "newrecord";
      this.updateCustomerInfo = null;
      this.policyInfo = null;
    },
    updateCustomer(customer) {
      this.$refs.adduser.$refs.customerModal.$el.click();
      this.pageType = "updateRecord";
      this.updateCustomerInfo = customer;
    },
    updateCustomerInfoEvent(data) {
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
      this.pageType = "newrecord";
      this.updateCustomerInfo = null;
      this.$emit("event", "Müşteri Başarılı Bir Şekilde Güncellendi");
      updateCustomerStorage(data.id, data);
      this.customers = getCustomers();
      this.copyCustomers = JSON.parse(JSON.stringify(this.customers));
    },
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
      this.pageType = "newrecord";
      this.updateCustomerInfo = null;
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