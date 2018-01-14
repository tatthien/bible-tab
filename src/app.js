import './app.scss'

import Vue from 'vue'
import setting from './setting'

new Vue({
  el: '#app',
  data: {
    defaultVerse: {
      content: {
        vi: 'Quyển sách luật-pháp nầy chớ xa miệng ngươi, hãy suy-gẫm ngày và đêm, hầu cho cẩn-thận làm theo mọi điều đã chép ở trong; vì như vậy ngươi mới được may-mắn trong con đường mình, và mới được phước.',
        en: 'Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.'
      },
      book: {
        vi: 'Giô-suê',
        en: 'Joshua'
      },
      code: 'JOS',
      chapter: 1,
      verse: 8
    },
    verseEndpoint: 'https://raw.githubusercontent.com/tatthien/bible-tab-verses/master/verses.json',
    verse: null,
    locale: setting.get('locale', 'vi'),
    locales: [
      { key: 'vi', title: 'VB1925 - Vietnamese' },
      { key: 'en', title: 'NIV - English' }
    ],
    mode: 'random',
    selectedInterval: setting.get('interval', 0),
    interval: [
      { time: 0, title: 'None' },
      { time: 1, title: '1 hour' },
      { time: 6, title: '6 hours' },
      { time: 12, title: '12 hours' },
      { time: 24, title: '1 day' }
    ],
    isShowSetting: false,
    isShowSettingMessage: false,
    isCopy: false
  },
  computed: {
    verseContent () {
      return !this.verse ? '' : this.verse.content[this.locale]
    },
    verseBook () {
      return !this.verse ? '' : this.verse.book[this.locale]
    },
    verseChapter () {
      return !this.verse ? '' : this.verse.chapter
    },
    verseVerse () {
      return !this.verse ? '' : this.verse.verse
    },
    verseCode () {
      return !this.verse ? '' : this.verse.code
    },
    verseAddress () {
      return this.verseBook + ' ' + this.verseChapter + ':' + this.verseVerse
    },
    verseFull () {
      return this.verseContent + ' - ' + this.verseAddress
    },
    bibleChapterUrl () {
      let address = `${this.verseCode}.${this.verseChapter}`
      if (this.locale === 'vi') {
        return `https://www.bible.com/bible/193/${address}.VB1925`
      } else {
        return `https://www.bible.com/bible/111/${address}.NIV`
      }
    },
    bibleVerseUrl () {
      let address = `${this.verseCode}.${this.verseChapter}.${this.verseVerse}`
      if (this.locale === 'vi') {
        return `https://www.bible.com/bible/193/${address}`
      }
      return `https://www.bible.com/bible/111/${address}`
    },
    facebookShareUrl () {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.bibleVerseUrl}`
    },
    twitterShareUrl () {
      return `https://twitter.com/home?status=${this.verseAddress} ${this.bibleVerseUrl}`
    }
  },
  created () {
    if (this.selectedInterval == 0) {
      this.fetch()
    } else {
      // Calculate the difference time
      let savedTime = setting.get('cached_time')
      let now = Date.now()
      let diff = now - savedTime
      let hourDiff = diff / (1000 * 60 * 60)
    
      if (hourDiff > this.selectedInterval) {
        this.fetch()
      } else {
        this.verse = JSON.parse(setting.get('cached_verse'))
      }
    }
  },
  watch: {
    selectedInterval () {
      setting.set('cached_time', Date.now())
    }
  },
  methods: {
    fetch () {
      fetch(this.verseEndpoint).then((response) => {
        return response.json()
      }).then((verses) => {
        this.verse = verses[this.getRandomIndex(verses.length)]
        setting.set('cached_verse', JSON.stringify(this.verse))
        // reset the time
        setting.set('cached_time', Date.now())
      })
    },
    getRandomIndex (length) {
      let index = Math.floor(Math.random(length) * Math.floor(length))
      let cachedIndex = setting.get('cached_index')
      if (index == cachedIndex) {
        this.getRandomIndex(length)
      }
      setting.set('cached_index', index)
      return index
    },
    copyVerse () {
      this.isCopy = true
      this.$nextTick(() => {
        let input = this.$refs.copy_input
  
        input.select()
        
        document.execCommand('Copy')
  
        // Show notification
        let notification = this.$refs.copy_noti
        notification.className = 'active'
        setTimeout(function () {
          notification.className = ''
        }, 1000)
      
        this.isCopy = false
      })
    },
    openShareWindow (e) {
      let target = e.target
      let strWindowFeatures = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,left=0,top=0,width=600, height=300'
      window.open(target.href, 'Bible Tab', strWindowFeatures)
    },
    saveSettings () {
      let form = this.$refs.form_settings
      let fields = form.querySelectorAll('select, input, texarea')
      for (let i = 0; i < fields.length; i++) {
        let field = fields[i]
        let name = field.name
        let value = field.value
        setting.set(name, value)
      }
    
      // Show success message
      this.isShowSettingMessage = true
      setTimeout(() => {
        this.isShowSettingMessage = false
      }, 2000)
    }
  } 
})