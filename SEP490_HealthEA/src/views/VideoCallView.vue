<template lang="">
  <ContentFooter>
    <div class="container has-text-centered" v-cloak id="app">
      <h1 class="title">
        Ứng dụng Clone Zoom cực cool ngầu với
        <span class="header-highlight">Stringee API</span>
      </h1>

      <div>
        <button class="button is-primary" v-if="!room" @click="createRoom">Tạo Meeting</button>

        <button class="button is-info" v-if="!room" @click="joinWithId">Join Meeting</button>

        <button class="button is-info" v-if="room" @click="publish(true)">Share Desktop</button>
      </div>

      <div v-if="roomId" class="info">
        <p>
          Bạn đang ở trong room <strong>{{ roomId }}</strong
          >.
        </p>
        <p>
          Gửi link này cho bạn bè cùng join room nhé
          <a v-bind:href="roomUrl" target="_blank">{{ roomUrl }}</a
          >.
        </p>
        <p>
          Hoặc bạn cũng có thể copy <code>{{ roomId }}</code> để share.
        </p>
      </div>
    </div>

    <div class="container">
      <div id="videos"></div>
    </div>
  </ContentFooter>
</template>

<script>
import ContentFooter from '@/components/layout/ContentFooter'
const videoContainer = document.querySelector('#videos')

export default {
  components: {
    ContentFooter
  },
  data() {
    return {
      userToken: '',
      roomId: '',
      roomToken: '',
      room: undefined,
      callClient: undefined
    }
  },
  computed: {
    roomUrl: function () {
      return `https://${location.hostname}?room=${this.roomId}`
    }
  },
  async mounted() {
    api.setRestToken()
    const urlParams = new URLSearchParams(location.search)
    const roomId = urlParams.get('room')
    if (roomId) {
      this.roomId = roomId

      await this.join()
    }
  },
}
</script>
<style lang=""></style>
