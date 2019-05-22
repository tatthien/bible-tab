<template>
  <div class="text-5xl container mx-auto">
    <blockquote class="mb-6 leading-snug font-serif">
      <p v-text="content"></p>
    </blockquote>
    <div class="flex items-center">
      <cite class="not-italic text-2xl">
        <a
          :href="readChapterUrl"
          v-text="address"
          class="hover:underline"
          title="Read full chapter"
        ></a>
      </cite>
      <span class="relative" v-click-outside="() => showDropdown = false">
        <span class="px-4 py-2 flex cursor-pointer" @click="showDropdown = !showDropdown">
          <span
            v-for="index in 3"
            class="block w-1 h-1 bg-white rounded-full mr-1"
            :style="{ background: $store.getters.settings.useBackground ? '#ffffff' : $store.getters.settings.textColor }"
            :key="index"
          ></span>
        </span>
        <transition name="slide-down">
          <ul
            class="absolute overflow-hidden z-50 top-full mt-2 left-4 bg-white rounded text-base shadow-lg text-left"
            v-if="showDropdown"
          >
            <li
              v-for="(action, key) in actions"
              :key="key"
              :class="{ 'border-b border-gray-400' : action.border }"
            >
              <a
                href="#"
                class="flex items-center block text-black pl-3 pr-5 py-2 cursor-pointer hover:bg-indigo-700 hover:text-white"
                @click.prevent="action.handler"
              >
                <feather-icon :icon="action.icon" :scale="0.8"></feather-icon>
                <span class="ml-2" v-text="action.label"></span>
              </a>
            </li>
          </ul>
        </transition>
      </span>
    </div>
  </div>
</template>

<script>
import books from '@/books'
import booksAbbr from '@/books-abbr'
import { setTimeout } from 'timers'
export default {
	name: 'bible',
	props: {
		scripture: {
			type: Object,
			required: true,
			default() {
				return {}
			},
		},
	},
	data() {
		return {
			showDropdown: false,
			actions: {
				facebook: {
					label: 'Facebook',
					icon: 'facebook',
					border: false,
					handler: this.shareFacebook,
				},
				twitter: {
					label: 'Twitter',
					icon: 'twitter',
					border: true,
					handler: this.shareTwitter,
				},
				copy: {
					label: 'Copy',
					icon: 'copy',
					border: false,
					handler: this.copy,
				},
			},
		}
	},
	computed: {
		settings() {
			return this.$store.getters.settings
		},
		content() {
			return this.settings.bibleLanguage === 'vi' ? this.scripture.ScriptureVi : this.scripture.ScriptureEn
		},
		chapter() {
			return this.scripture.Chapter
		},
		verse() {
			return this.scripture.Verse
		},
		book() {
			return books[this.scripture.Book - 1] ? books[this.scripture.Book - 1][this.settings.bibleLanguage] : ''
		},
		address() {
			return `${this.book} ${this.chapter}:${this.verse}`
		},
		readChapterUrl() {
			let version = this.settings.bibleLanguage === 'vi' ? 193 : 111
			return `https://bible.com/bible/${version}/${booksAbbr[this.scripture.Book - 1]}.${this.chapter}`
		},
	},
	methods: {
		bookmark() {},
		openPopup(url, title) {
			window.open(url, title, 'resizable,scrollbars,status,width=800,height=600')

			this.showDropdown = false
		},
		shareFacebook() {
			let url = 'https://facebook.com/dialog/share'
			url += `?href=${this.readChapterUrl}.${this.verse}`
			url += `&hashtag=%23BibleTabExtension`
			url += `&quote=${this.address} ${this.content}`
			url += `&app_id=627925637689443`
			this.openPopup(url, 'Share verse on Facebook')
		},
		shareTwitter() {
			let url = 'https://twitter.com/intent/tweet'
			url += `?text=${this.address} ${this.content} via %23BibleTabExtension`
			url += `&url=${this.readChapterUrl}.${this.verse}`
			this.openPopup(url, 'Share verse on Twitter')
		},
		copy() {
			let str = this.content + ' ' + this.address
			let el = document.createElement('textarea')
			el.value = str
			el.setAttribute('readonly', '')
			el.style.position = 'absolute'
			el.style.left = '-9999px'
			document.body.appendChild(el)
			el.select()
			document.execCommand('copy')
			document.body.removeChild(el)

			this.showDropdown = false
		},
	},
}
</script>
