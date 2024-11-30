<template>
  <div class="customer-call-container">
    <h2>Video Call - Customer</h2>
    <!-- Video Container -->
    <button
      @click="
        handleCall('f56f167f-af25-4433-ba65-990d64dd0d61', 'bed9177f-c08e-4113-87ff-7546f4cef7be')
      "
    >
      Start Video Call
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleCall(customerId, doctorId) {
      const url = `http://127.0.0.1:5500/web-sdk/video-call-demo/customer.html?customerId=${customerId}&doctorId=${doctorId}`
      // const url = `http://127.0.0.1:5501/web-sdk/video-call-demo/user2.html`
      window.open(url, '_blank')
    }
  }
}
</script>
