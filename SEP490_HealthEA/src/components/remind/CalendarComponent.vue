<script setup>
const value = defineModel('valueZ')
const listEventz = defineModel('listEvent')

</script>
<template>
  <div>
    <a-calendar v-model:value="value">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.content">
            <a-badge class="item_event" :status="item.type" :text="item.content" />
          </li>
        </ul>
      </template>
    </a-calendar>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  methods: {
    onPanelChange(value, source) {
      if (source === 'date') {
        console.log('Panel Select:', source)
      }
    },
    getListData(value) {
      try {
        var list = []
        const datetime = value.format('YYYY-MM-DD')
        this.listEvent.forEach((element) => {
          var s = element.eventDateTime
          if (dayjs(s).format('YYYY-MM-DD') == datetime) {
            list.push({
              type: 'warning',
              content: element.title
            })
          }
        })
        return list
      } catch (err) {
        return []
      }
    }
  }
}
</script>
<style scoped>
.item_event {
  padding: 5px;
  border-radius: 10px;
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 6px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
