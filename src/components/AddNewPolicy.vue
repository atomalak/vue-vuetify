<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="teal lighten-3" dark v-on="on"
          >Yeni Poliçe Ekle</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Yeni Poliçe</span>
        </v-card-title>
        <v-form class="px-3" ref="form">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field label="Poliçe Ismi" v-model="name"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-3" text @click="dialog = !dialog">
              Kapat</v-btn
            >
            <v-btn color="red darken" text @click="savePolicy"> Kaydet</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import {calculatePoliciesId} from "../storage"
export default {
  data: (vm) => ({
    dialog: false,
    name: "",
  }),
  methods: {
    savePolicy() {
      let policy = {
        name: this.name,
        id:calculatePoliciesId()
      };
      this.$emit("savePolicy", policy);
      this.dialog = false;
    },
  },
};
</script>