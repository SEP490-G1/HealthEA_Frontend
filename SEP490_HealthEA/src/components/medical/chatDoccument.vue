<script setup>
import { ref } from 'vue'
</script>
<template>
  <div>
    <a-drawer
      width="500px"
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'black' }"
      title="Tư vấn với ai"
      placement="right"
    >
      <div
        style="
          height: 70%;
          border:
            1px,
            rgba(10, 20, 20, 0.1) solid;
          border-radius: 20px;
          overflow: auto;
        "
        class="scrollTop"
      >
        <div v-for="(item, index) in chatList" v-bind:key="index">
          <div
            v-if="item.senderType == 'USER'"
            style="background-color: aliceblue; margin: 10px; margin-left: 200px; padding: 10px"
          >
            <b> Bạn: </b>
            {{ item.message }}
          </div>
          <div
            v-if="item.senderType == 'AI'"
            style="background-color: aliceblue; margin: 10px; margin-right: 100px; padding: 10px"
          >
            <b> AI: </b>
            {{ item.message }}
          </div>
        </div>
      </div>
      <div style="margin-top: 10px">
        <a-input-search
          :loading="loading"
          v-model:value="value"
          placeholder="Nhập câu hỏi của bạn..."
          size="large"
          @search="onSearch"
        >
          <template #enterButton>
            <a-button :loading="loading" @click="sendThis(value)">
              <SendOutlined />
            </a-button>
          </template>
        </a-input-search>

        <a-typography-title :level="4" style="width: 100%; margin-top: 20px"
          >Một số gợi ý</a-typography-title
        >
        <a-button
          :loading="loading"
          type="primary"
          ghost
          @click="sendThis('Hãy tư vấn giúp tôi các chỉ số này')"
          style="width: 100%; margin-top: 10px"
          >Tư vấn với tài liệu này</a-button
        ><a-button
          :loading="loading"
          type="primary"
          ghost
          @click="sendThis('Tôi nên điều chỉnh ăn uống như thế nào?')"
          style="width: 100%; margin-top: 10px"
          >Tôi nên điều chỉnh ăn uống như thế nào?</a-button
        >
        <a-button
          :loading="loading"
          type="primary"
          ghost
          @click="apointMent"
          style="width: 100%; margin-top: 10px"
          >Đặt lịch khám với bác sĩ của chúng tôi</a-button
        >
      </div>
    </a-drawer>
    <a-float-button @click="toChat" :badge="{ dot: true }">
      <template #icon>
        <CommentOutlined />
      </template>
    </a-float-button>
  </div>
</template>
<script>
import { CommentOutlined, SendOutlined } from '@ant-design/icons-vue'
import { useChatDocument } from '@/stores/ChatStore'

export default {
  props: ['idDoc'],
  mounted() {
    this.loadData()
  },
  data() {
    return {
      value: ref(''),
      loading: ref(false),
      idDocument: this.idDoc,
      open: ref(false),
      chatList: ref({})
    }
  },
  methods: {
    apointMent() {
      this.$router.push('/listDoctor')
    },
    async sendThis(msg) {
      this.value = ''
      this.loading = true
      const store = useChatDocument()
      let body = { message: msg }
      let response = await store.sendId(this.idDocument, body)

      console.log(response)
      this.loading = false
      this.loadData()
    },
    async loadData() {
      const store = useChatDocument()
      let response = await store.getChat()
      console.log('Loging', response.data)
      this.chatList = []
      this.chatList = response.data
    },

    toChat() {
      this.open = !this.open
      console.log('To chat now')
    }
  }
}
</script>
<style lang=""></style>
