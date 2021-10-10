<template>
  <v-row justify="center" class="mb-3">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <ShowMessage :message="message" :status="status" />
      <template v-slot:activator="{ on }">
        <v-btn color="blue" dark v-on="on">Poliçe Tanımı</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span>{{ name }} Poliçe Tanımı</span>
        </v-card-title>
        <v-form class="px-3" ref="form">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Müşteri Adı"
                  v-model="name"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex" cols="12" sm="12" md="12" lg="12">
                <v-select
                  :items="policies"
                  label="Poliçe Seçimi"
                  v-model="selectionPolicy"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="200px"
                  min-width="200px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateformatted"
                      label="Poliçe Başlangıç Tarihi"
                      hint="DD/MM/YYYY"
                      prepend-icon="event"
                      @blur="date = parseDate(dateformatted)"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu1 = false"
                    full-width
                    :min="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    fullscreen
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-menu
                  ref="menu1"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="200px"
                  min-width="200px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateformatted2"
                      label="Poliçe Bitiş Tarihi"
                      hint="DD/MM/YYYY"
                      prepend-icon="event"
                      @blur="date2 = parseDate(dateformatted2)"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date2"
                    no-title
                    @input="menu2 = false"
                    full-width
                    :min="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    fullscreen
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-3" text @click="dialog = !dialog">
              Kapat</v-btn
            >
            <v-btn color="red darken" text @click="save"> Kaydet</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import ShowMessage from "@/components/ShowMessage";
import { getPolicies, saveCustomerPolicies } from "../storage";
export default {
  props: ["customerinfo"],
  components: {
    ShowMessage,
  },
  data: (vm) => ({
    dialog: false,
    menu1: false,
    date: new Date().toISOString().substr(0, 10),
    dateformatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    date2: new Date().toISOString().substr(0, 10),
    dateformatted2: vm.formatDate(new Date().toISOString().substr(0, 10)),
    name: "",
    policies: [],
    selectionPolicy: null,
    message: "",
    status: false,
  }),
  mounted() {
    getPolicies().map((policy) => {
      this.policies.push({
        text: policy.name,
        value: policy.id,
      });
    });
    this.name = this.customerinfo.name + " " + this.customerinfo.surname;
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      this.date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    save() {
      if (!this.selectionPolicy) {
        this.message = "Poliçe Seçimi Yapmalısınız";
        this.status = true;
        setTimeout(() => {
          this.status = false;
        }, 2000);
        return;
      }

      let customerPolicy = {
        customerId: this.customerinfo.id,
        policyId: this.selectionPolicy,
        policyStartDate: this.date,
        policyEndDate: this.date2,
      };
      saveCustomerPolicies(customerPolicy);
      this.dialog = false;
      this.$emit("event", "Işleminiz Başarılıyla Gerçekleştirildi");
      //this.$emit("eventnewpolicy");
    },
  },
  watch: {
    date() {
      this.dateformatted = this.formatDate(this.date);
    },
    date2() {
      this.dateformatted2 = this.formatDate(this.date2);
    },
  },
};
</script>