<template>
  <div class="text-5xl container mx-auto">
    <blockquote class="mb-4 leading-tight px-8">
      <p v-text="content"></p>
    </blockquote>
    <cite v-text="address"></cite>
  </div>
</template>

<script>
import books from '@/book'
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
	},
}
</script>
