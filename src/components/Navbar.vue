<template>
  <nav v-if="showNavbar">
    <v-app-bar color="red" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Müşteri Poliçe</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row class="text-center">
        <v-col cols="12" sm="12" md="12" lg="9">
          <v-text-field
            append-icon="search"
            hint="Müşteri Ara"
            dark
            width="400px"
            @input="searchCustomer"
            v-model="value"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn text style="display: none">
        <span>Çıkış</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" dark color="red darken-4" app>
      <v-list flat>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          route
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      value: "",
      links: [
        {
          icon: "folder",
          text: "Müşteriler",
          route: "/",
        },
        {
          icon: "person",
          text: "Poliçe Tanımı",
          route: "/policies",
        },
      ],
      showNavbar: false,
    };
  },
  methods: {
    searchCustomer() {
      if (this.value.length > 2) {
        this.$emit("searchcustomer", this.value);
      } else {
        this.$emit("searchcustomer", this.value);
        this.$emit("event", "En Az 3 Harf Girmelisiniz");
      }
    },

    checkSystemLogin() {
      let clear = setInterval(() => {
        if (sessionStorage.getItem("loginInfo") !== null) {
          clearInterval(clear);
        }
      }, 500);
    },
  },

  mounted() {
    this.checkSystemLogin();
  },
};
</script>
<style scoped>
</style>