<template>
  <div class="text-5xl container mx-auto">
    <blockquote class="mb-6 leading-snug font-serif">
      <p v-text="content" />
    </blockquote>
    <div class="flex items-center">
      <cite class="not-italic text-2xl">
        <a
          :href="readChapterUrl"
          class="hover:underline"
          title="Read full chapter"
          v-text="address"
        />
      </cite>
      <span
        v-click-outside="() => showDropdown = false"
        class="relative"
      >
        <span
          class="px-4 py-2 flex cursor-pointer"
          @click="showDropdown = !showDropdown"
        >
          <span
            v-for="index in 3"
            :key="index"
            class="block w-1 h-1 bg-white rounded-full mr-1"
            :style="{ background: isUseBackground ? '#ffffff' : $store.getters.settings.textColor }"
          />
        </span>
        <transition name="slide-down">
          <ul
            v-if="showDropdown"
            class="absolute overflow-hidden top-full mt-2 left-4 bg-white rounded text-base shadow-lg"
						style="min-width: 160px"
          >
            <li
              v-for="(action, key) in actions"
              :key="key"
              :class="{ 'border-b border-gray-400' : action.border }"
            >
              <a
                href="#"
                class="text-black hover:text-white hover:bg-indigo-700 block py-2 px-4"
                @click.prevent="action.handler"
              >
                <feather-icon
                  :name="action.icon"
                  :scale="0.8"
                />
                <span
                  class="ml-2"
                  v-text="action.label"
                />
              </a>
            </li>
          </ul>
        </transition>
      </span>
    </div>
  </div>
</template>

<script>
import books from '@/books';
import booksAbbr from '@/books-abbr';

export default {
  name: 'Bible',
  props: {
    scripture: {
      type: Object,
      required: true,
      default() {
        return {};
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
    };
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    content() {
      return this.settings.bibleLanguage === 'vi'
        ? this.scripture.ScriptureVi
        : this.scripture.ScriptureEn;
    },
    chapter() {
      return this.scripture.Chapter;
    },
    verse() {
      return this.scripture.Verse;
    },
    book() {
      return books[this.scripture.Book - 1]
        ? books[this.scripture.Book - 1][this.settings.bibleLanguage]
        : '';
    },
    address() {
      return `${this.book} ${this.chapter}:${this.verse}`;
    },
    readChapterUrl() {
      const version = this.settings.bibleLanguage === 'vi' ? 193 : 111;
      return `https://bible.com/bible/${version}/${
        booksAbbr[this.scripture.Book - 1]
      }.${this.chapter}`;
    },
    isUseBackground() {
      return this.$store.getters.settings.useBackground;
    },
  },
  methods: {
    bookmark() {},
    openPopup(url, title) {
      window.open(
        url,
        title,
        'resizable,scrollbars,status,width=800,height=600',
      );

      this.showDropdown = false;
    },
    shareFacebook() {
      let url = 'https://facebook.com/dialog/share';
      url += `?href=${this.readChapterUrl}.${this.verse}`;
      url += '&hashtag=%23BibleTabExtension';
      url += `&quote=${this.address} ${this.content}`;
      url += '&app_id=627925637689443';
      this.openPopup(url, 'Share verse on Facebook');
    },
    shareTwitter() {
      let url = 'https://twitter.com/intent/tweet';
      url += `?text=${this.address} ${this.content} via %23BibleTabExtension`;
      url += `&url=${this.readChapterUrl}.${this.verse}`;
      this.openPopup(url, 'Share verse on Twitter');
    },
    copy() {
      const str = `${this.content} ${this.address}`;
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      this.showDropdown = false;
    },
  },
};
</script>
