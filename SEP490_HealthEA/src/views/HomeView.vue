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
          justify-content: flex-start;
        "
      >
        <a-typography-title style="margin-left: 200px; color: aliceblue" :level="2"
          >{{ Title }}
        </a-typography-title>
      </div>

      <a-typography-title
        style="display: flex; align-items: center; justify-content: center"
        :level="1"
      >
        Danh sách bác sĩ nổi bật
      </a-typography-title>
      <doctorList />
    </a-layout-content>
  </div>
</template>
<script>
import doctorList from '@/components/doctor/doctorList'
import { useUserStore } from '@/stores/user'
export default {
  components: {
    doctorList
  },
  mounted() {
    try {
      const store = useUserStore()
      var name = store.user.userFirstName + ' ' + store.user.userLastName
      let now = new Date()
      let hours = now.getHours()
      console.log('user', hours)
      var str = `Chào buổi sáng`
      if (hours > 12) {
        str = 'Chào buổi chiều'
      }
      if (hours > 18) {
        str = 'Chào buổi tối'
      }
      this.Title = `${str} ${name},`
    } catch   {
      console.log('Chill day')
    }
  },
  data() {
    return {
      Title: 'Chào mừng bạn đến với Health EA'
    }
  }
}
</script>
