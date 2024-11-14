<template>
  <div>
    <br />
    <a-qrcode  ref="qrcodeCanvasRef" :color='black' :value="qrcodeCanvasRef" />
    <br />
    <br />
    <a-button type="primary" @click="dowloadChange">Download</a-button>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  props: ['LINK'],
  data() {
    return {
      qrcodeCanvasRef: ref(this.LINK == null ? '#' : this.LINK)
    }
  },
  methods: {
    async dowloadChange() {
      const url = await this.qrcodeCanvasRef.value.toDataURL()
      const a = document.createElement('a')
      a.download = 'QRCode.png'
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}
</script>
<style lang=""></style>
