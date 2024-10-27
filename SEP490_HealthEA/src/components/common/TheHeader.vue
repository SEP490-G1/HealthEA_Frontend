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
            <a-menu-item :class="item.path == pathActive ? 'ant-menu-item-selected' : ''" v-for="(item, index) in listHeaderCustomer" :key="index"><RouterLink :to="item.path">{{item.text}}</RouterLink></a-menu-item>
          </div>
          <UserHeader />
        </a-flex>
      </a-menu>
    </a-layout-header>
  </div>
</template>
<script>
import UserHeader from '../UserHeader.vue'
export default {
  name: 'TheHeader',
  data() {
    return {
      pathActive: 1,
      listHeaderAdmin: [
        { key: 1, path: '/' },
        { key: 1, path: '/' },
        { key: 1, path: '/' },
        { key: 1, path: '/' }
      ],
      listHeaderCustomer: [
        { path: '/', text: 'Trang chủ' },
        { path: '/profileHealth',text: 'Hồ sơ sức khỏe' },
        { path: '/about' , text: 'Về chúng tôi'},
        { path: '/profile', text: 'Hồ sơ của bạn' }
      ],
      listHeaderDoctor: [
        { key: 1, path: '/' },
        { key: 1, path: '/' },
        { key: 1, path: '/' },
        { key: 1, path: '/' }
      ]
    }
  },
  mounted() {
    this.findSelectedKey()
  },
  watch: {
    $route(to) {
      this.pathActive = to.path
      console.log('path', to.path)
    }
  },
  methods: {
    findSelectedKey() {
      // this.selected = this.$route.meta.headerClass
    }
  }
}
</script>
<style lang=""></style>
