<template>
    <div class="update-doctor-container">
      <a-card title="Update Profile" class="doctor-update-card">
        <form @submit.prevent="updateDoctorInfo">
          <a-form layout="vertical">
            <a-form-item label="Display Name">
              <a-input v-model:value="doctorInfo.displayName" placeholder="Enter your display name" />
            </a-form-item>
            <a-form-item label="Description">
              <a-textarea v-model:value="doctorInfo.description" rows=4 placeholder="Enter a brief description" />
            </a-form-item>
            <a-form-item label="Specialization">
              <a-input v-model:value="doctorInfo.specialization" placeholder="Enter your specialization" />
            </a-form-item>
            <a-form-item label="Clinic Address">
              <a-input v-model:value="doctorInfo.clinicAddress" placeholder="Enter your clinic address" />
            </a-form-item>
            <a-form-item label="Clinic City">
              <a-input v-model:value="doctorInfo.clinicCity" placeholder="Enter your clinic city" />
            </a-form-item>
            <div class="d-flex justify-content-end mt-3">
              <a-button type="primary" html-type="submit">Save Changes</a-button>
            </div>
          </a-form>
        </form>
      </a-card>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/user';
  import { Card, Form, Input, Button } from 'ant-design-vue';
  import axios from 'axios';
  
  export default {
    components: {
      'a-card': Card,
      'a-form': Form,
      'a-form-item': Form.Item,
      'a-input': Input,
      'a-textarea': Input.TextArea,
      'a-button': Button,
    },
    data() {
      return {
        doctorInfo: {
          displayName: '',
          description: '',
          specialization: '',
          clinicAddress: '',
          clinicCity: '',
        },
      };
    },
    async created() {
      const userStore = useUserStore();
      try {
        const response = await axios.get('http://localhost:5217/api/Doctor/me', {
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        console.log(response)
        const data = response.data;
        if (data) {
          this.doctorInfo = {
            displayName: data.displayName || '',
            description: data.description || '',
            specialization: data.specialization || '',
            clinicAddress: data.clinicAddress || '',
            clinicCity: data.clinicCity || '',
          };
        }
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    },
    methods: {
      async updateDoctorInfo() {
        console.log(this.doctorInfo)
        const userStore = useUserStore();
        try {
          await axios.put('http://localhost:5217/api/Doctor/me', this.doctorInfo, {
            headers: { Authorization: `Bearer ${userStore.token}` },
          });
          this.$message.success('Profile updated successfully');
        } catch (error) {
          console.error('Error updating profile:', error);
          this.$message.error('Failed to update profile');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .update-doctor-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px;
  }
  
  .doctor-update-card {
    width: 100%;
  }
  </style>
  