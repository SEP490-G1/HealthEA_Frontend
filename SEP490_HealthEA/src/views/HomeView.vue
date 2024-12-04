<script setup>
import doctorList from '@/components/doctor/doctorList'
</script>

<template>
  <a-layout>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content
        style="flex-direction: column; align-items: center"
        :style="{
          background: '#fff',
          margin: 0,
          minHeight: '280px',
          margin: '20px'
        }"
      >
        <div
          style="
            background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);

            width: 100%;
            height: 30vh;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <a-typography-title style="color: aliceblue" :level="2"
            >Chào mừng bạn đến với HEALTH EA
          </a-typography-title>
        </div>
        <a-typography-title :level="2"> Danh sách bác sĩ nổi bật </a-typography-title>
        <doctorList />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
