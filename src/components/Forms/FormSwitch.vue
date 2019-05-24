<template>
  <span
    :class="[isChecked ? 'bg-indigo-700' : '', 'bg-gray-500 rounded-full relative cursor-pointer transition']"
    style="width: 42px; height: 25px;"
    @click="change"
  >
    <span
      class="absolute bg-white rounded-full transition shadow-md"
      :style="styles"
    />
  </span>
</template>

<script>
export default {
  name: 'FormSwitch',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      isChecked: this.checked,
    };
  },
  computed: {
    styles() {
      const styles = {
        height: '21px',
        width: '21px',
        top: '2px',
      };

      styles.left = !this.isChecked ? '2px' : '19px';

      return styles;
    },
  },
  methods: {
    change() {
      this.isChecked = !this.isChecked;
      this.$emit('change', this.isChecked);
    },
  },
};
</script>
