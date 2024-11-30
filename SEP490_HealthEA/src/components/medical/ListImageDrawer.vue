<template>
  <a-image-preview-group>
    <a-image v-for="(item, index) in list" :key="index" :width="200" :src="item.imageUrl" />
  </a-image-preview-group>
</template>
<script>
import { imageStore } from '@/stores/ImageManagement'
import { ref } from 'vue'
export default {
  props: ['listImg'],
  data() {
    return {
      list: ref([])
    }
  },
  methods: {
    async getImageLink(id) {
      const store = imageStore()
      return await store.getLinkImage(id)
    },
    async getImage() {
      this.listImg.forEach(async (element) => {
        var image = await this.getImageLink(element)
        this.list.push(image.data)
      })
      console.log(this.list[0])
    }
  },
  mounted() {
    this.getImage()
  }
}
</script>
<style lang=""></style>
