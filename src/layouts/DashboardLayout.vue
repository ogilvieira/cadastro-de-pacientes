<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
const { logout } = useAuthStore();
</script>
<template>
  <v-layout fill-height>
    <v-app-bar flat color="primary">
      <v-app-bar-title>{{pageTitle}}</v-app-bar-title>
      <template v-slot:append>
        <v-btn @click="logout()" icon="mdi-logout"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
  <v-footer class="bg-grey-lighten-2 text-center d-flex flex-column" >
    <div>
      <strong>Gilmair Vieira</strong>
      {{ new Date().getFullYear() }}
    </div>
  </v-footer>  
</template>
<script>
  export default {
    name: 'DashboardLayout',
    computed: {
      pageTitle() {
        return this.$route?.meta?.title || 'Dashboard';
      }
    }
  }
</script>
