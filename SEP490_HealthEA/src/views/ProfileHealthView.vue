<script setup>
import { PieChartOutlined } from '@ant-design/icons-vue'
import { reactive, h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import TheMenu from '@/components/common/TheMenu.vue'
import CommonLayout from '@/components/medical/CommonLayout'
/**
 * This view for medical report management module
 * @date: 10/05/2024
 * @author: thuyht/gitzno
 */
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
        
        <common-layout :listBread="routes">
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
      routes: [
        {
          path: 'index',
          breadcrumbName: 'First-level Menu'
        },
        {
          path: 'first',
          breadcrumbName: 'Second-level Menu'
        },
        {
          path: 'second',
          breadcrumbName: 'Third-level Menu'
        }
      ],
      key: ref(['sub1']),
      selectedKeys: ref(['0']),
      items: reactive([
        {
          key: '0',
          icon: () => h(PieChartOutlined),
          label: h(
            RouterLink,
            { to: '/profileHealth/medical_record/information' },
            'Thông tin chung'
          ),
          title: 'Thông tin chung'
        },
        {
          key: 'sub1',
          icon: () => h(PieChartOutlined),
          label: 'Loại hồ sơ',
          title: 'Các loại hồ sơ',
          children: [
            {
              key: '2',
              label: h(
                RouterLink,
                { to: '/profileHealth/medical_record/prehistoric' },
                'Tiền Sử Bệnh'
              ),
              title: 'Tiền sử bệnh'
            },
            {
              key: '3',
              label: h(
                RouterLink,
                { to: '/profileHealth/medical_record/vaccination' },
                'Tiêm Chủng'
              ),
              title: 'Lịch sử tiêm chủng'
            },
            {
              key: '4',
              label: h(
                RouterLink,
                { to: '/profileHealth/medical_record/prescription' },
                'Đơn Thuốc'
              ),
              title: 'Đơn thuốc'
            },
            {
              key: '5',
              label: h(RouterLink, { to: '/profileHealth/medical_record/testing' }, 'Xét Nghiệm'),
              title: 'Xét nghiệm'
            },
            {
              key: '6',
              label: h(
                RouterLink,
                { to: '/profileHealth/medical_record/diagnostic_image' },
                'Chẩn đoán hình ảnh'
              ),
              title: 'Hình ảnh chẩn đoán'
            },
            {
              key: '7',
              label: h(
                RouterLink,
                { to: '/profileHealth/medical_record/history_examination' },
                'Lịch Sử Khám'
              ),
              title: 'Lịch sử khám bệnh'
            }
          ]
        }
      ])
    }
  }
}
</script>
