<script setup>
import { PieChartOutlined } from '@ant-design/icons-vue'
import {  h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import TheMenu from '@/components/common/TheMenu.vue'
import CommonLayout from '@/components/medical/CommonLayout'
</script>

<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <TheMenu :itemList="items" :openKeys="key" :selectedKeys="selectedKeys" />
    </a-layout-sider>
    <a-layout style="padding: 0 0 0 24px">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '10px' }"
      >
        <common-layout>
          <RouterView />
        </common-layout>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      idNew: this.$route.params.id,
      key: ref(['1']),
      selectedKeys: ref(['0']),
      items: [
        {
          key: '0',
          icon: () => h(PieChartOutlined),
          label: h(
            RouterLink,
            { to: `/profileHealth/medical_record/information/` + this.$route.params.id },
            'Thông tin chung'
          ),
          title: 'Thông tin chung'
        },
        {
          key: '1',
          icon: () => h(PieChartOutlined),
          label: 'Loại hồ sơ',
          title: 'Các loại hồ sơ',
          children: [
            {
              key: '2',
              label: h(
                RouterLink,
                { to: '/profileHealth/medical_record/prehistoric/' + this.$route.params.id },
                'Tiền Sử Bệnh'
              ),
              title: 'Tiền sử bệnh'
            },
            {
              key: '3',
              label: h(
                RouterLink,
                { to: '/profileHealth/medical_record/vaccination/' + this.$route.params.id },
                'Tiêm Chủng'
              ),
              title: 'Lịch sử tiêm chủng'
            },
            {
              key: '4',
              label: h(
                RouterLink,
                { to: `/profileHealth/medical_record/prescription/${this.$route.params.id}` },
                'Đơn Thuốc'
              ),
              title: 'Đơn thuốc'
            },
            {
              key: '5',
              label: h(RouterLink, { to: `/profileHealth/medical_record/testing/${this.$route.params.id}` }, 'Xét Nghiệm'),
              title: 'Xét nghiệm'
            },
          ]
        }
      ]
    }
  }
}
</script>
