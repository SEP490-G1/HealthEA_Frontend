<script setup></script>

<template>
  <a-layout >
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              Người dùng
            </span>
          </template>
          <a-menu-item key="1"><RouterLink to="/admin/userList">Thông tin người dùng</RouterLink></a-menu-item>
          <a-menu-item key="2"><RouterLink to="/admin/createUser">Tạo mới người dùng</RouterLink></a-menu-item>
        </a-sub-menu>

        <a-menu-item key="3"><RouterLink to="function1">Feature 5</RouterLink></a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-breadcrumb style="margin: 16px 0">
        <!-- <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item> -->
      </a-breadcrumb>
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
