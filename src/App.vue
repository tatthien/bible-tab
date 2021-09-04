<template>
  <div>{{ msg }}</div>
  <div>{{ test }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      msg: 'Hello',
      test: '123',
    }
  },
})
</script>
