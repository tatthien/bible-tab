<template>
  <div>
    <div
      class="absolute top-0 right-0 bottom-0 left-0 z-0 bg-cover bg-center bg-no-repeat"
      v-if="backgroundUrl !== ''"
      :style="{ backgroundImage: `url(${backgroundUrl})` }"
    ></div>
    <div class="absolute top-0 right-0 bottom-0 left-0 opacity-25 bg-black"></div>
  </div>
</template>

<script>
export default {
	name: 'unsplash-image',
	created() {
		if (!this.$store.getters.background) {
			this.$store.dispatch('GET_BACKGROUND_IMAGE')
		}
	},
	computed: {
		background() {
			return this.$store.getters.background
		},
		backgroundUrl() {
			return this.background ? this.background.urls.full : ''
		},
	},
}
</script>
