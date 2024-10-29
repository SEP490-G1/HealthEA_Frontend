<script setup>
import { ref } from 'vue'
</script>
<template lang="">
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Quản lý người dùng"
      :breadcrumb="{ routes }"
      @back="() => null"
    />
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name', 'age', 'address'].includes(colum.dataIndex)">
          <div>
            <a-input
              v-if="editabeData[record.key]"
              v-model:value="editabeData[record.key][colum.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="colum.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editabeData[record.key]">
              <a-typography-link @click="save(record.key)">Save</a-typography-link>
              <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">Edit</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  beforeMount() {
    for (let i = 0; i < 100; i++) {
      this.dataUser.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      })
    }
  },
  data() {
    return {
      dataSource: ref(this.dataUser),
      columns: [
        {
          title: 'name',
          dataIndex: 'name',
          width: '10%'
        },
        {
          title: 'name',
          dataIndex: 'name',
          width: '10%'
        },
        {
          title: 'age',
          dataIndex: 'age',
          width: '15%'
        },
        {
          title: 'address',
          dataIndex: 'address',
          width: '40%'
        },
        {
          title: 'operation',
          dataIndex: 'operation'
        }
      ],
      dataUser: [
        {
          key: 1,
          name: `Edrward 1`,
          age: 32,
          address: `London Park no. 1`
        }
      ],
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
      ]
    }
  }
}
</script>
<style lang=""></style>
