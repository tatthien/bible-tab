<template>
  <div>
    <transition name="fade-in">
      <div
        class="absolute top-0 right-0 bottom-0 left-0 z-0 bg-cover bg-center bg-no-repeat"
        v-show="isBackgroundLoaded"
        :style="{ backgroundImage: `url(${backgroundUrl})` }"
      ></div>
    </transition>
    <div class="absolute top-0 right-0 bottom-0 left-0 opacity-40 bg-black"></div>
  </div>
</template>

<script>
export default {
	name: 'unsplash-image',
	created() {
		if (!this.background) {
			this.$store.dispatch('GET_BACKGROUND_IMAGE')
		}

		this.loadImage()
	},
	data() {
		return {
			isBackgroundLoaded: false,
		}
	},
	computed: {
		background() {
			return this.$store.getters.background
		},
		backgroundUrl() {
			return this.background ? this.background.urls.custom : ''
		},
	},
	watch: {
		background: {
			handler() {
				this.loadImage()
			},
			deep: true,
		},
	},
	methods: {
		loadImage() {
			let img = document.createElement('img')
			img.src = this.backgroundUrl
			img.onload = () => {
				this.isBackgroundLoaded = true
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.fade-in-enter-active,
.fade-in-leave-active {
	transition: 0.5s all;
	opacity: 1;
}

.fade-in-enter,
.fade-in-leave-to {
	opacity: 0;
}
</style>
