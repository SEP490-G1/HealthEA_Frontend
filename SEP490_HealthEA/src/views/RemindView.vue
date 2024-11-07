<template>
  <div>
    <RemindView> 
        <RouterView />
    </RemindView>
  </div>
</template>
<script>
import RemindView from '@/components/remind/MainRemind'
export default {
  components: {
    RemindView
  }
}
</script>
<style></style>
