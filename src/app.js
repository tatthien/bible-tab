'use strict';

import './app.scss'

import Vue from 'vue'
import setting from './setting'
import map from './map'

new Vue({
  el: '#app',
  data: {
    defaultVerse: {
      content: {
        vi: 'Quyển sách luật-pháp nầy chớ xa miệng ngươi, hãy suy-gẫm ngày và đêm, hầu cho cẩn-thận làm theo mọi điều đã chép ở trong; vì như vậy ngươi mới được may-mắn trong con đường mình, và mới được phước.',
        en: 'Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful.'
      },
      code: 'jos',
      chapter: 1,
      verse: 8
    },
    verseEndpoint: 'https://raw.githubusercontent.com/tatthien/bible-tab-verses/master/verses.json',
    verse: null,
    selectedLocale: setting.get('locale', 'vi'),
    locales: [
      { key: 'vi', title: 'VB1925 - Vietnamese' },
      { key: 'en', title: 'NIV - English' }
    ],
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
      return !this.verse ? '' : this.verse.content[this.selectedLocale]
    },
    verseChapter () {
      return !this.verse ? '' : this.verse.chapter
    },
    veserVerse () {
      return !this.verse ? '' : this.verse.verse
    },
    verseCode () {
      return !this.verse ? '' : this.verse.code.toLowerCase()
    },
    verseBook () {
      if (!this.verse) return ''
      return map[this.verseCode] ? map[this.verseCode][this.selectedLocale] : ''
    },
    verseAddress () {
      return this.verseBook + ' ' + this.verseChapter + ':' + this.veserVerse
    },
    verseWithAdress () {
      return this.verseContent + ' - ' + this.verseAddress
    },
    chapterURL () {
      let address = `${this.verseCode}.${this.verseChapter}`
      if (this.selectedLocale === 'vi') {
        return `https://www.bible.com/bible/193/${address}.VB1925`
      } else {
        return `https://www.bible.com/bible/111/${address}.NIV`
      }
    },
    verseURL () {
      let address = `${this.verseCode}.${this.verseChapter}.${this.veserVerse}`
      let url = this.selectedLocale === 'vi' 
        ? `https://www.bible.com/bible/193/${address}`
        : `https://www.bible.com/bible/111/${address}`

      return url
    },
    facebookShareUrl () {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.verseURL}`
    },
    twitterShareUrl () {
      return `https://twitter.com/home?status=${this.verseAddress} ${this.verseURL}`
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
        this.verse = verses[this.getIndex(verses.length)]
        setting.set('cached_verse', JSON.stringify(this.verse))
        
        // reset the time
        setting.set('cached_time', Date.now())
      })
    },
    getIndex (length) {
      let cachedIndex = setting.get('cached_index', -1)
      if (cachedIndex < length - 1) {
        cachedIndex++
      } else {
        cachedIndex = 0
      }
      setting.set('cached_index', cachedIndex)
      return cachedIndex;
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