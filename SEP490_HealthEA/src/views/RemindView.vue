<template>
  <div>
    <MainRemind> 
        <RouterView />
    </MainRemind>
  </div>
</template>
<script>
import MainRemind from '@/components/remind/MainRemind.vue';

export default {
  components: {
    MainRemind 
  }
}
</script>
<style></style>