<template>
  <v-container>
    <h1 class="text-center mb-4">Poliçe Tanımı</h1>
    <AddNewPolicy @savePolicy="savePolicy($event)" />

    <v-row v-if="policies.length > 0">
      <v-col md="4" sm="3" lg="4" v-for="policy in policies" :key="policy">
        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
          <v-card-title> {{ policy.name }} </v-card-title>
          <v-card-actions>
            <v-btn color="red"> Sil </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  
  </v-container>
</template>
<script>
import AddNewPolicy from "@/components/AddNewPolicy";
export default {
  data() {
    return {
      policies: [],
    };
  },
  components: {
    AddNewPolicy,
  },
  methods: {
    savePolicy(data) {
      this.$savePolicy(data);
      let policy = data;
      this.policies.push(policy)
       this.$emit("event", "Işleminiz Başarılıyla Gerçekleştirildi");
    },
  },

  mounted() {
    this.policies=this.$getPolicies();
  },
};
</script>