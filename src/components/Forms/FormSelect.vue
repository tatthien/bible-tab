<template>
  <div
    class="text-black relative"
    style="min-width: 160px; flex: 0"
    v-click-outside="() => showDropdown = false"
  >
    <input
      class="bg-white px-4 py-1 inline-block w-full rounded cursor-pointer outline-none hover:bg-grey-lightest"
      readonly="readonly"
      @click="showDropdown = !showDropdown"
      :value="this.selectedLabel"
    >
    <span class="absolute" style="right: 10px; top: 50%; margin-top: -8px;">
      <icon-arrow-down></icon-arrow-down>
    </span>
    <transition name="slide-down">
      <ul
        class="list-reset bg-white absolute w-full mt-2 rounded border border-grey-darker overflow-hidden z-50"
        v-show="showDropdown"
      >
        <li
          :class="[option.value === selected ? 'text-green-light font-bold' : '', 'px-4 py-2 cursor-pointer hover:bg-green-light hover:text-black']"
          v-for="option in options"
          :key="option.value"
          v-text="option.label"
          @click="select(option.value, option.label)"
        ></li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
	name: 'form-select',
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
				return ''
			},
		},
		options: {
			type: Array,
			required: true,
			default() {
				return []
			},
		},
	},
	data() {
		return {
			selected: this.value,
			selectedLabel: this.options.filter(
				option => option.value === this.value
			)[0].label,
			showDropdown: false,
		}
	},
	methods: {
		select(value, label) {
			this.selected = value
			this.selectedLabel = label
			this.showDropdown = false
			this.$emit('change', value)
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
