<script setup></script>

<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-menu-item key="-1"><RouterLink to="#">Tạo Hồ Sơ Mới</RouterLink></a-menu-item>
        <a-menu-item key="0"><RouterLink to="#">Thông Tin Chung</RouterLink></a-menu-item>
        <a-menu-item key="1"><RouterLink to="#">Tiêm Chủng</RouterLink></a-menu-item>
        <a-menu-item key="2"><RouterLink to="#">Đơn Thuốc</RouterLink></a-menu-item>
        <a-menu-item key="3"><RouterLink to="#">Xét Nghiệm</RouterLink></a-menu-item>
        <a-menu-item key="4"><RouterLink to="#">Chẩn Đoán Hình Ảnh</RouterLink></a-menu-item>
        <a-menu-item key="5"><RouterLink to="#">Lịch Sử Khám/Tư Vấn</RouterLink></a-menu-item>
        <a-menu-item key="6"><RouterLink to="#">Tiền Sử</RouterLink></a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
