<script setup>
import { RouterLink } from 'vue-router'
</script>
<template lang="">
  <div>
    <a-layout-header class="header">
      <a-menu
      v-model:selectedKeys="selected"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
      >
        <a-flex style="padding: 0 10px; width: 100%" justify="space-between">
          <div>
            <a-menu-item key="1"><RouterLink to="/">Home</RouterLink></a-menu-item>
            <a-menu-item key="2"
              ><RouterLink to="/client/login">Client View</RouterLink></a-menu-item
            >
            <a-menu-item key="3"><RouterLink to="/about">About</RouterLink></a-menu-item>
            <a-menu-item key="4"
              ><RouterLink to="/profileHealth">Hồ Sơ sức khỏe</RouterLink></a-menu-item
            >
            {{selected}}
          </div>
          <UserHeader />
        </a-flex>
      </a-menu>
    </a-layout-header>
  </div>
</template>
<script>
import UserHeader from '../UserHeader.vue';
export default {
  name: 'TheHeader',
  data() {
    return {
    }
  },
  mounted(){
    this.findSelectedKey()
  },
  setup(){
    var selected = "helko"
    
    console.log(selected())
    // expose to template and other options API hooks
    return {
      selected
    }
  },
  methods: {
    findSelectedKey(){
      // this.selected = this.$route.meta.headerClass
    }
  }

}
</script>
<style lang=""></style>
