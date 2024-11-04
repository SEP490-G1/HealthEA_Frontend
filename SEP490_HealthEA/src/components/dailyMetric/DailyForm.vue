<template>
  <a-modal visible="" title="Đường Huyết">
    
  </a-modal>
</template>

<script>
import { ref } from 'vue'
export default {
  data() {
    return {

      userData: ref({
        name: 'Thụy',
        gender: '1',
        address: 'a',
        dob: '', // Assuming you want dob as a property
        note: '111',
        statusShare: ''
      })
    }
  },
  props: {
    formStage: ref({
      name: '',
      gender: '',
      address: '',
      dob: '', // Assuming you want dob as a property
      note: '',
      statusShare: ''
    })
  }
}
</script>
