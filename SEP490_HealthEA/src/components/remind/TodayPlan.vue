<template>
  <div class="card">
    <a-typography-title :level="3">Today plan</a-typography-title>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.card {
  height: 100%;
  border: black;
  border-radius: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
