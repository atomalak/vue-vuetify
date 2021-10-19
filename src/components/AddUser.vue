<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn
          outlined
          color="teal lighten-3"
          dark
          v-on="on"
          ref="customerModal"
          >Yeni Müşteri Ekle
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline"
            >{{ pageType == "newrecord" ? "Yeni Müşteri" : "Müşteri Güncelle" }}
          </span>
        </v-card-title>
        <v-form class="px-3" ref="form">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Müşteri Adı" v-model="name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Müşteri Soyadı"
                  v-model="surname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="phone"
                  maxlength="11"
                  label="Müşteri Telefon Bilgisi"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="tc"
                  maxlength="11"
                  label="Tc Numarası"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-3" text @click="closeModal">
              Kapat
            </v-btn>
            <v-btn
              color="red darken"
              text
              @click="savecustomer"
              v-if="pageType == 'newrecord'"
            >
              Kaydet</v-btn
            >
            <v-btn color="red darken" text @click="updateCustomerValue" v-else>
              Güncelle</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { calculateCustomerId } from "../storage";
export default {
  props: ["pageType", "updateCustomer"],
  data: (vm) => ({
    dialog: false,
    name: "",
    surname: "",
    kkb: "",
    phone: "",
    tc: "",
    rules: [
      (v) =>
        v.length <= 16 ||
        "Maksimum 16 karakter uzunluğunda değer girilebilinir.",
    ],
  }),
  methods: {
    closeModal() {
      this.dialog = !this.dialog;
      this.$emit("updateProps");
    },
    checkInputLenght(event) {
      if (this.kkb > 15) {
        event.preventDefault();
      }
    },
    updateCustomerValue() {
      let user = {
        name: this.name,
        surname: this.surname,
        phone: this.phone,
        tc: this.tc,
        id: value.id
        
      };
      this.$emit("updateCustomerInfo", user);
      this.dialog = false;
    },
    savecustomer() {
      let user = {
        name: this.name,
        surname: this.surname,
        phone: this.phone,
        tc: this.tc,
        id: calculateCustomerId(),
      };
      this.$emit("saveCustomer", user);
      this.dialog = false;
    },
  },

  watch: {
    updateCustomer(value) {
      if (value !== null) {
        this.name = value.name;
        this.surname = value.surname;
        this.phone = value.phone;
        this.tc = value.tc;
      } else {
        this.name = "";
        this.surname = "";
        this.phone = "";
        this.tc = "";
      }
    },
  },
};
</script>