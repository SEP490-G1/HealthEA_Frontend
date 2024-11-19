<script setup>
// import TheMenu from '@/components/common/TheMenu.vue'
import { ref, h, reactive } from 'vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <a-layout>
    <!-- <a-layout-sider width="200" style="background: #fff">
      <TheMenu :itemList="items" :openKeys="keyOpen" :selectedKeys="selectedKeys" />
    </a-layout-sider> -->
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      keyOpen: ref(['sub1']),
      items: reactive([
        {
          key: '0',
          label: h(
            RouterLink,
            { to: '#' },
            'Bảng điều khiển'
          ),
          title: 'Bảng điều khiển'
        },
        {
          key: 'sub1',
          label: 'Quản lý người dùng',
          title: 'Các loại hồ sơ',
          children: [
            {
              key: '2',
              label: h(RouterLink, { to: '/profileHealth/medical_record/prehistoric' }, 'Tất cả'),
              title: 'Tất cả'
            },
            {
              key: '3',
              label: h(
                RouterLink,
                { to: '/profileHealth/medical_record/vaccination' },
                'Khách hàng'
              ),
              title: 'Khách hàng'
            },
            {
              key: '4',
              label: h(RouterLink, { to: '/profileHealth/medical_record/prescription' }, 'Bác sĩ'),
              title: 'Bác sĩ'
            }
          ]
        }
      ])
    }
  }
}
</script>
