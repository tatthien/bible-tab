<template>
  <svg
    :width="width"
    :height="height"
    :stroke="color"
    :stroke-width="strokeWidth"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-html="contents"
  />
</template>
<script>
import feather from 'feather-icons';

export default {
  props: {
    name: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    color: {
      type: String,
      default() {
        return '#000000';
      },
    },
    scale: {
      type: [Number, String],
      default() {
        return 1;
      },
    },
  },
  computed: {
    icon() {
      return feather.icons[this.name];
    },
    width() {
      return this.icon ? this.icon.attrs.width * this.scale : 0;
    },
    height() {
      return this.icon ? this.icon.attrs.height * this.scale : 0;
    },
    viewBox() {
      return this.icon ? this.icon.attrs.viewBox : '0 0 0 0';
    },
    strokeWidth() {
      return this.icon ? this.icon.attrs['stroke-width'] : 0;
    },
    contents() {
      return this.icon ? this.icon.contents : '';
    },
  },
};
</script>
