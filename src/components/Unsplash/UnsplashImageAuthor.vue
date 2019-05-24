<template>
  <a
    :href="imageLink"
    target="_blank"
    class="block no-underline opacity-70 hover:opacity-100"
    :style="{ color: textColor }"
  >
    <p v-text="imageDescription" />
    <p>
      Photo by
      <strong v-text="imageAuthor" />
      @ Unsplash
    </p>
  </a>
</template>

<script>
export default {
  name: 'UnsplashImageAuthor',
  computed: {
    textColor() {
      if (this.$store.getters.settings.useBackground) {
        return '#fff';
      }
      return this.$store.getters.settings.textColor;
    },
    background() {
      return this.$store.getters.background;
    },
    imageDescription() {
      return this.background && this.background.location ? this.background.location.title : '';
    },
    imageAuthor() {
      return this.background ? this.background.user.name : '';
    },
    imageLink() {
      return this.background ? this.background.user.links.html : '#';
    },
  },
};
</script>
