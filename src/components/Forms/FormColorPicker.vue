<template>
  <div v-click-outside="() => showPicker = false" class="relative">
    <span
      class="rounded-full block cursor-pointer border border-gray-500"
      :style="{backgroundColor: selected, width: '35px', height: '35px'}"
      @click="showPicker = !showPicker"
    />
    <transition name="slide-down">
      <ul
        v-if="showPicker"
        class="absolute mt-2 flex flex-wrap bg-white right-0 z-50 rounded-lg p-2 shadow-lg"
        style="width: 256px;"
      >
        <li v-for="(color, index) in colors" :key="index" class="w-1/5 h-12 p-1 cursor-pointer">
          <span
            class="border flex justify-center items-center block w-full h-full rounded-full"
            :style="{backgroundColor: color}"
            @click="change(color)"
          >
            <span
              v-if="color === selected"
              :class="[color === '#ffffff' ? 'bg-black' : 'bg-white', 'block rounded-full w-3 h-3']"
            />
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FormColorPicker',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default() {
        return '#ffffff';
      },
    },
  },
  data() {
    return {
      showPicker: false,
      selected: this.value,
      colors: [
        '#000000',
        '#ffffff',
        '#3e6158',
        '#3f7a89',
        '#96c582',
        '#b7d5c4',
        '#bcd6e7',
        '#7c90c1',
        '#9d8594',
        '#dad0d8',
        '#4b4fce',
        '#4e0a77',
        '#a367b5',
        '#ee3e6d',
        '#d63d62',
        '#c6a670',
        '#f46600',
        '#cf0500',
        '#efabbd',
        '#8e0622',
        '#f0b89a',
        '#f0ca68',
        '#62382f',
        '#c97545',
        '#c1800b',
      ],
    };
  },
  methods: {
    change(color) {
      this.selected = color;
      this.$emit('change', color);
    },
  },
};
</script>
