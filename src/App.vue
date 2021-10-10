<template>
  <v-app>
    <Navbar @event="event($event)" @searchcustomer="searchcustomer" />
    <v-content class="ma-4">
      <router-view
        @event="event($event)"
        :searchValue="searchValue"
        :newPolicyAdded="newPolicyAdded"
        @eventnewpolicy="eventnewpolicy"
      ></router-view>
    </v-content>
    <ShowMessage :message="message" :status="status" />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import AddUser from "@/components/AddUser";
import ShowMessage from "@/components/ShowMessage";

export default {
  components: {
    Navbar,
    AddUser,
    ShowMessage,
  },
  data() {
    return {
      message: "",
      status: false,
      searchValue: "",
      newPolicyAdded: false,
    };
  },
  methods: {
    event(data) {
      this.message = data;
      this.status = true;
      setTimeout(() => {
        this.status = false;
      }, 2000);
    },
    searchcustomer(value) {
      this.searchValue = value;
    },
    eventnewpolicy() {
      this.newPolicyAdded = true;
      setTimeout(() => {
        this.newPolicyAdded = false;
      },2000);
    },
  },
};
</script>