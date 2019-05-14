<template>
  <div id="app" class="h-full">
    <unsplash-image v-if="settings.useBackground"></unsplash-image>
    <div class="relative z-20 flex flex-col justify-between h-full text-base" :style="themeStyle">
      <header class="flex justify-between px-5 py-5">
        <div>
          <date-time v-if="settings.showDate"></date-time>
        </div>
        <div>
          <div class="relative" v-click-outside="() => showSettings = false">
            <span class="flex items-center cursor-pointer" @click="showSettings = !showSettings">
              <icon-gear :scale="1.5" :fill="textColor"></icon-gear>
              <span class="ml-1">Settings</span>
            </span>
            <transition name="show-settings">
              <ul
                v-if="showSettings"
                class="bg-black text-white list-reset absolute mt-4 pin-r rounded-lg"
                style="width: 400px"
              >
                <li
                  class="flex justify-between items-center px-5 py-3 border-grey-darkest border-b"
                >
                  <label for="show-date">Show date</label>
                  <form-switch v-model="settings.showDate"></form-switch>
                </li>
                <li
                  class="flex justify-between items-center px-5 py-3 border-grey-darkest border-b"
                >
                  <label for="use-background">Background image</label>
                  <form-switch v-model="settings.useBackground"></form-switch>
                </li>
                <li
                  v-if="!settings.useBackground"
                  class="flex justify-between items-center px-5 py-3 border-grey-darkest border-b"
                >
                  <label for="color-picker">Select background color</label>
                  <form-color-picker v-model="settings.backgroundColor"></form-color-picker>
                </li>
                <li
                  v-if="!settings.useBackground"
                  class="flex justify-between items-center px-5 py-3 border-grey-darkest border-b"
                >
                  <label for="color-picker">Select text color</label>
                  <form-color-picker v-model="settings.textColor"></form-color-picker>
                </li>
                <li
                  class="flex justify-between items-center px-5 py-3 border-grey-darkest border-b"
                >
                  <label for="change-verse">Change verse after</label>
                  <form-select
                    id="change-verse"
                    :options="changeVerseOptions"
                    v-model="changeVerse"
                  ></form-select>
                </li>
                <li class="flex justify-between items-center px-5 py-3">
                  <label for="bible-language">Bible language</label>
                  <form-select
                    id="bible-language"
                    :options="bibleLanguageOptions"
                    v-model="settings.bibleLanguage"
                  ></form-select>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </header>
      <main class="text-center">
        <bible :scripture="scripture"></bible>
      </main>
      <footer class="flex justify-between px-5 py-5">
        <div>
          <unsplash-image-author></unsplash-image-author>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Bible from '@/components/Bible.vue'
import FormSwitch from '@/components/Forms/FormSwitch.vue'
import FormSelect from '@/components/Forms/FormSelect.vue'
import FormColorPicker from '@/components/Forms/FormColorPicker.vue'
import DateTime from '@/components/DateTime.vue'
import UnsplashImage from '@/components/Unsplash/UnsplashImage.vue'
import UnsplashImageAuthor from '@/components/Unsplash/UnsplashImageAuthor.vue'

export default {
	name: 'app',
	components: {
		Bible,
		FormSwitch,
		FormSelect,
		FormColorPicker,
		DateTime,
		UnsplashImage,
		UnsplashImageAuthor,
	},
	created() {
		// Save settings when run the extension for the first time.
		if (!this.$store.getters.initialize) {
			this.$store.dispatch('SET_SETTINGS', this.settings)
		}

		if (this.isNextRequest) {
			this.$store.dispatch('GET_SCRIPTURE', this.scriptureIndex)
		}
	},
	data() {
		return {
			showSettings: false,
			changeVerseOptions: [
				{
					value: '15',
					label: '15 minutes',
				},
				{
					value: '30',
					label: '30 minutes',
				},
				{
					value: '60',
					label: '1 hour',
				},
				{
					value: '1440',
					label: '1 day',
				},
			],
			bibleLanguageOptions: [
				{
					value: 'en',
					label: 'English',
				},
				{
					value: 'vi',
					label: 'Vietnamese',
				},
			],
		}
	},
	computed: {
		settings() {
			return this.$store.getters.settings
		},
		scripture() {
			return this.$store.getters.scripture
		},
		scriptureIndex() {
			let index = this.$store.getters.scriptureIndex
			if (index < 524) {
				index++
			} else {
				index = 1
			}

			this.$store.dispatch('SET_SCRIPTURE_INDEX', index)

			return index
		},
		changeVerse: {
			get() {
				return this.settings.changeVerse
			},
			set(value) {
				this.settings.changeVerse = value
			},
		},
		nextRequest() {
			return this.$store.getters.nextRequest
		},
		isNextRequest() {
			let now = Math.round(Date.now() / 1000)
			return now > this.nextRequest
		},
		textColor() {
			if (this.settings.useBackground) {
				return '#fff'
			}
			return this.settings.textColor
		},
		backgroundColor() {
			if (this.settings.useBackground) {
				return 'transparent'
			}
			return this.settings.backgroundColor
		},
		themeStyle() {
			return {
				backgroundColor: this.backgroundColor,
				color: this.textColor,
			}
		},
	},
	watch: {
		settings: {
			handler(newVal, oldVal) {
				this.$store.dispatch('SET_SETTINGS', newVal)
			},
			deep: true,
		},
		changeVerse(newVal) {
			this.settings.changeVerse = newVal
			this.$store.dispatch('SET_NEXT_REQUEST')
		},
	},
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';

html,
body {
	height: 100%;
}
body {
	min-height: 100%;
	overflow: hidden;
	background: #fff;
}

.show-settings-enter-active,
.show-settings-leave-active {
	transition: 0.3s all;
	opacity: 1;
	margin-top: 1rem;
}

.show-settings-enter,
.show-settings-leave-to {
	opacity: 0;
	margin-top: 0;
}
</style>
