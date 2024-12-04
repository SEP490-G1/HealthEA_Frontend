<script setup>
import doctorList from '@/components/doctor/doctorList'
</script>

<template>
  <div style="display: flex; align-items: center">
    <a-layout-content
      style="flex-direction: column; align-items: center; height: 100%"
      :style="{
        margin: 0,
        width: '1280px'
      }"
    >
      <div
        style="
          background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);

          width: 100%;
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <a-typography-title style="color: aliceblue" :level="2"
          >Chào mừng bạn đến với HEALTH EA
        </a-typography-title>
      </div>

      <a-typography-title
        style="display: flex; align-items: center; justify-content: center"
        :level="2"
      >
        Danh sách bác sĩ nổi bật
      </a-typography-title>
      <doctorList />
    </a-layout-content>
  </div>
</template>
