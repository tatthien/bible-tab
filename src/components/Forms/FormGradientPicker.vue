<template>
  <div class="relative" v-click-outside="() => showPicker = false">
    <span
      class="rounded-full block cursor-pointer border border-gray-500"
      :style="{backgroundImage: `linear-gradient(135deg, ${selected[0]} 0%, ${selected[1]} 100%)`, width: '35px', height: '35px'}"
      @click="showPicker = !showPicker"
    ></span>
    <transition name="slide-down">
      <ul
        class="absolute mt-2 flex flex-wrap bg-white right-0 z-50 rounded-lg p-2 shadow-lg"
        v-if="showPicker"
        style="width: 256px;"
      >
        <li class="w-1/5 h-12 p-1 cursor-pointer" v-for="(color, index) in colors" :key="index">
          <span
            class="flex justify-center items-center block w-full h-full rounded-full border border-gray-400"
            :style="{backgroundImage: `linear-gradient(135deg, ${color[0]} 0%, ${color[1]} 100%)`}"
            @click="change(color)"
          >
            <span
              class="block rounded-full w-3 h-3"
              :style="{backgroundColor: '#fff'}"
              v-if="color[0] === selected[0] && color[1] === selected[1]"
            ></span>
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
	name: 'form-color-picker',
	model: {
		prop: 'value',
		event: 'change',
	},
	props: {
		value: {
			type: Array,
			default() {
				return ['#fff', '#fff']
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
		}
	},
	methods: {
		change(color) {
			this.selected = color
			this.$emit('change', color)
		},
	},
}
</script>

<style lang="scss" scoped>
.slide-down-enter-active,
.slide-down-leave-active {
	transition: 0.3s all;
	opacity: 1;
	margin-top: 0.5rem;
}

.slide-down-enter,
.slide-down-leave-to {
	opacity: 0;
	margin-top: 0;
}
</style>
