<template>
  <div
    v-click-outside="() => showDropdown = false"
    class="text-black relative"
    style="min-width: 160px; flex: 0"
  >
    <input
      class="bg-white px-4 py-1 inline-block w-full rounded cursor-pointer outline-none hover:bg-gray-200"
      readonly="readonly"
      :value="this.selectedLabel"
      @click="showDropdown = !showDropdown"
    >
    <span
      class="absolute top-1/2 right-3"
      style="margin-top: -14px;"
    >
      <feather-icon
        name="arrow-down"
        scale="0.75"
      />
    </span>
    <transition name="slide-down">
      <ul
        v-show="showDropdown"
        class="bg-white absolute w-full mt-2 rounded overflow-hidden z-50 shadow-lg"
      >
        <li
          v-for="option in options"
          :key="option.value"
          :class="[option.value === selected ? 'font-bold' : '', 'px-4 py-2 cursor-pointer hover:bg-indigo-700 hover:text-white']"
          @click="select(option.value, option.label)"
          v-text="option.label"
        />
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default() {
        return '';
      },
    },
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selected: this.value,
      selectedLabel: this.options.filter(option => option.value === this.value)[0].label,
      showDropdown: false,
    };
  },
  methods: {
    select(value, label) {
      this.selected = value;
      this.selectedLabel = label;
      this.showDropdown = false;
      this.$emit('change', value);
    },
  },
};
</script>
