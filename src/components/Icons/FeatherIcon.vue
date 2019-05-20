<template>
  <span v-html="svg"></span>
</template>
<script>
import feather from 'feather-icons'
export default {
	props: {
		icon: {
			type: String,
			required: true,
			default() {
				return ''
			},
		},
		color: {
			type: String,
			default() {
				return '#000000'
			},
		},
		scale: {
			type: Number,
			default() {
				return 1
			},
		},
	},
	computed: {
		svg() {
			if (!feather.icons[this.icon]) {
				return ''
			}
			return feather.icons[this.icon].toSvg({
				color: this.color,
				width: 24 * this.scale,
				height: 24 * this.scale,
			})
		},
	},
}
</script>
