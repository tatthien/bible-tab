<template>
  <div class="text-lg" v-text="date"></div>
</template>

<script>
import format from 'date-fns/format'
export default {
	name: 'date-time',
	computed: {
		date() {
			return format(new Date(), 'ddd, MMM DD hh:mm A')
		},
	},
}
</script>
