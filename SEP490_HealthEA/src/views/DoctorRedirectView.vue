<template>
    <div class="loading-container d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from "@/stores/user";
import axios from "axios";
  
  export default {
    name: "DoctorRedirect",
    data() {
      const API_URL = import.meta.env.VITE_API_URL_DOTNET
      return {
        apiUrl: `${API_URL}/api/Doctor/me`,
      };
    },
    mounted() {
      this.redirectToDoctorProfile();
    },
    methods: {
      async redirectToDoctorProfile() {
        try {
            var userStore = useUserStore()
          const response = await axios.get(this.apiUrl, {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
          });
          if (response.status === 200 && response.data.id) {
            this.$router.push(`/listDoctor/${response.data.id}`);
          } else {
            console.error("Unexpected response structure:", response);
            this.$router.push("/error/404");
          }
        } catch (error) {
          console.error("Error fetching doctor profile:", error);
          this.$router.push("/error/404");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .loading-container {
    height: 100vh;
  }
  </style>
  