<script setup>
import { reactive } from 'vue'
/**
 * This component for menu is layout have menu
 * @prop:  items: reactive([
 *   {
          key: '1',
          icon: () => h(PieChartOutlined),
          label: h(RouterLink, { to: '/profileHealth/login' }, 'Thông tin chung'),
          title: 'Thông tin chung'
        },
 * ])
 * @date: 10/05/2024
 * @author: thuyht/gitzno
 */
</script>
<template lang="">
  <div>
    <a-menu
      v-model:selectedKeys="selected"
      v-model:openKeys="open"
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
      :items="itemList"
    >
    </a-menu>
  </div>
</template>
<script>
export default {
  props: {
    itemList: reactive([]),
    openKeys: [],
    selectedKeys: []
  },
  data() {
    return {
      selected: this.selectedKeys,
      open: this.openKeys
    }
  },
  methods: {
    openModal() {
      this.$emit('input', 'test')
    }
  }
}
</script>
<style lang=""></style>
