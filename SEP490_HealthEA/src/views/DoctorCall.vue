<template>
  <div class="doctor-call-container">
    <h2>Video Call - Doctor</h2>
    <div id="video-container" class="text-center">
      <video id="localVideo" autoplay muted></video>
      <video id="remoteVideo" autoplay style="height: 360px"></video>
    </div>

    <div class="text-center mt-4">
      <button
        v-if="!callActive && !incomingCall"
        id="callButton"
        class="btn btn-success"
        @click="startCall"
      >
        Call
      </button>
      <button v-if="incomingCall" id="answerCallButton" class="btn btn-info" @click="answerCall">
        Answer Call
      </button>
      <button v-if="incomingCall" id="rejectCallButton" class="btn btn-warning" @click="rejectCall">
        Reject Call
      </button>
      <button v-if="callActive" id="endCallButton" class="btn btn-danger" @click="endCall">
        End Call
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      incomingCall: false,
      callActive: false,
      token:
        'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLmlUQjgyU1JYbVBiUlcxem16R0tlUG5Xd1ZzVXV4bzItMTczMjY5NjQzNyIsImlzcyI6IlNLLjAuaVRCODJTUlhtUGJSVzF6bXpHS2VQbld3VnNVdXhvMiIsImV4cCI6MTczNTI4ODQzNywidXNlcklkIjoidXNlcjIifQ.LueU1onrDgn8N5QLKRVDrT8YzdOcTjb9rz4xyOw_I-0',
      callerId: 'user2',
      calleeId: 'user1'
    }
  },
  methods: {
    startCall() {
      console.log('Starting call...')
      this.callActive = true
    },
    answerCall() {
      console.log('Answering call...')
      this.incomingCall = false
      this.callActive = true
    },
    rejectCall() {
      console.log('Rejecting call...')
      this.incomingCall = false
    },
    endCall() {
      console.log('Ending call...')
      this.callActive = false
    }
  }
}
</script>

<style scoped>
#video-container {
  position: relative;
  margin: auto;
  width: 640px;
}

video {
  background: #dee;
}

#localVideo {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  z-index: 10;
  background: #333;
}

#remoteVideo {
  width: 100%;
}

button {
  margin: 5px;
}
</style>
