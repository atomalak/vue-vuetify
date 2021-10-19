<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <ShowMessage :message="message" :status="status" />
      <template v-slot:activator="{ on }">
        <v-btn color="blue" block dark v-on="on" ref="opencreatemodal"
          >Yeni Poliçe Ekle</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span> {{ policyInfo ? "Poliçe Güncelleme" : "Poliçe Tanımı" }}</span>
        </v-card-title>
        <v-form class="px-3" ref="form">
          <v-card-text>
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
            <v-row
              v-if="
                selectionPolicy &&
                (selectionPolicy == 2 || selectionPolicy == 3)
              "
            >
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  label="Plaka"
                  v-model="plateNumber"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row
              v-if="
                selectionPolicy &&
                (selectionPolicy == 2 || selectionPolicy == 3)
              "
            >
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  label="Belge Seri No"
                  v-model="seriNo"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row
              v-if="
                selectionPolicy &&
                (selectionPolicy == 2 || selectionPolicy == 3)
              "
            >
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  label="Araç Marka Model"
                  v-model="markamodel"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-textarea
                  label="Son Görüşme Notu"
                  v-model="meeting"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  label="Sigorta Fiyatı"
                  v-model="price"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex" cols="12" sm="12" md="12" lg="12">
                <v-select
                  :items="priceType"
                  label="Ödeme Şekli"
                  v-model="priceTypeSelected"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row v-if="priceTypeSelected == 'kkb'">
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-textarea
                  label="Kredi Kartı Bilgileri"
                  v-model="crediCardInfo"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-textarea label="Referans" v-model="referans"></v-textarea>
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
                      v-model="tanzimDateFormatted"
                      label="Tanzim Tarihi"
                      hint="DD/MM/YYYY"
                      prepend-icon="event"
                      @blur="tanzimDate = parseDate(tanzimDateFormatted)"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tanzimDate"
                    no-title
                    @input="menu2 = false"
                    full-width
                    fullscreen
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-3" text @click="closeModals">
              Kapat</v-btn
            >
            <v-btn
              color="orange darken"
              text
              @click="updatePolicy"
              v-if="policyInfo"
            >
              Güncelle</v-btn
            >
            <v-btn color="red darken" text @click="save" v-else> Kaydet</v-btn>
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
  props: ["customerinfo", "policyInfo"],
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
    plateNumber: "",
    seriNo: "",
    markamodel: "",
    tanzimDate: new Date().toISOString().substr(0, 10),
    tanzimDateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    price: "",
    priceTypeSelected: "",
    priceType: [
      {
        text: "Kredi Kartı",
        value: "kkb",
      },
      {
        text: "Havale",
        value: "hav",
      },
      {
        text: "Nakit",
        value: "cash",
      },
    ],
    crediCardInfo: "",
    referans: "",
    meeting: "",
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
    updatePolicy() {},
    closeModals() {
      this.dialog = !this.dialog;
      this.$emit("updateProps");
    },
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
        tanzimDate: this.tanzimDate,
        crediCardInfo: this.crediCardInfo,
        referans: this.referans,
        meeting: this.meeting,
        priceType: this.priceTypeSelected,
        plateNumber: this.plateNumber,
        seriNo: this.seriNo,
        markamodel: this.markamodel,
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
    tanzimDate() {
      this.tanzimDateFormatted = this.formatDate(this.tanzimDate);
    },
    policyInfo(value) {
      if (value !== null) {
        this.selectionPolicy = value.policyId;
        this.date = value.policyStartDate;
        this.date2 = value.policyEndDate;
        this.tanzimDate = value.tanzimDate;
        this.crediCardInfo = value.crediCardInfo;
        this.referans = value.referans;
        this.meeting = value.meeting;
        this.priceTypeSelected = value.priceType;
        this.plateNumber = value.plateNumber;
        this.seriNo = value.seriNo;
        this.markamodel = value.markamodel;
      } else {
        this.selectionPolicy = null;
        this.date = new Date().toISOString().substr(0, 10);
        this.date2 = new Date().toISOString().substr(0, 10);
        this.tanzimDate = new Date().toISOString().substr(0, 10);
        this.crediCardInfo = "";
        this.referans = "";
        this.meeting = "";
        this.price = "";
        this.priceTypeSelected = "";
        this.plateNumber = "";
        this.seriNo = "";
        this.markamodel = "";
      }
    },
  },
};
</script>