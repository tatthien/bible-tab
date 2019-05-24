<template>
  <div
    v-click-outside="() => showPicker = false"
    class="relative"
  >
    <span
      class="rounded-full block cursor-pointer"
      :style="{backgroundImage: linearGradient, width: '35px', height: '35px'}"
      @click="showPicker = !showPicker"
    />
    <transition name="slide-down">
      <ul
        v-if="showPicker"
        class="absolute mt-2 flex flex-wrap bg-white right-0 z-50 rounded-lg p-2 shadow-lg"
        style="width: 256px;"
      >
        <li
          v-for="(color, index) in colors"
          :key="index"
          class="w-1/5 h-12 p-1 cursor-pointer"
        >
          <span
            class="flex justify-center items-center block h-full rounded-full"
            :style="{backgroundImage: `linear-gradient(135deg, ${color[0]} 0%, ${color[1]} 100%)`}"
            @click="change(color)"
          >
            <span
              v-if="color[0] === selected[0] && color[1] === selected[1]"
              class="block rounded-full w-3 h-3"
              :style="{backgroundColor: '#fff'}"
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
      type: Array,
      default() {
        return ['#08AEEA', '#2AF598'];
      },
    },
  },
  data() {
    return {
      showPicker: false,
      selected: this.value,
      colors: [
        ['#08AEEA', '#2AF598'],
        ['#FEE140', '#FA709A'],
        ['#85FFBD', '#FFFB7D'],
        ['#a1c4fd', '#c2e9fb'],
        ['#e9defa', '#fbfcdb'],
        ['#00c6fb', '#005bea'],
      ],
    };
  },
  computed: {
    linearGradient() {
      return `linear-gradient(135deg, ${this.selected[0]} 0%, ${this.selected[1]} 100%)`;
    },
  },
  methods: {
    change(color) {
      this.selected = color;
      this.$emit('change', color);
    },
  },
};
</script>
