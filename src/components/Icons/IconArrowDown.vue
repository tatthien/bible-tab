<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 10 16">
    <path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path>
  </svg>
</template>

<script>
export default {
	props: {
		scale: {
			type: Number,
			default() {
				return 1
			},
		},
		fill: {
			type: String,
			default() {
				return '#000'
			},
		},
	},
	computed: {
		width() {
			return 10 * this.scale
		},
		height() {
			return 16 * this.scale
		},
	},
}
</script>
