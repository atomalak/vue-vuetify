<template>
  <v-container>
    <h1 class="text-center">Sisteme Giriş Bilgileri</h1>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-text-field label="Kullanıcı Adı" type="text" v-model="name">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-text-field label="Şifre" type="password" v-model="password">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-btn block color="red" dark @click="login">Giriş Yap</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      password: "",
    };
  },

  methods: {
    login() {
      if (this.name.length == 0) {
        alert("Kullanıcını Adınızı Kontrol Ediniz");
        return;
      }
      if (this.password.length == 0) {
        alert("Kullanıcını Adınızı Kontrol Ediniz");
        return;
      }

      if (
        this.name == "ufukisik@gmail.com" &&
        this.password == "ufukseyda*-123"
      ) {
      } else {
        alert("Bilgilerinizi Kontrol Ederek Tekrar Deneyiniz");
      }
    },
  },
};
</script>