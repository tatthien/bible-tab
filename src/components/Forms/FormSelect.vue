<template>
  <div
    class="text-black relative"
    style="min-width: 160px; flex: 0"
    v-click-outside="() => showDropdown = false"
  >
    <input
      class="bg-white px-4 py-1 inline-block w-full rounded cursor-pointer outline-none hover:bg-gray-200"
      readonly="readonly"
      @click="showDropdown = !showDropdown"
      :value="this.selectedLabel"
    >
    <span class="absolute top-1/2 right-3" style="margin-top: -9px;">
      <feather-icon icon="arrow-down" :scale="0.75"></feather-icon>
    </span>
    <transition name="slide-down">
      <ul
        class="bg-white absolute w-full mt-2 rounded overflow-hidden z-50 shadow-lg"
        v-show="showDropdown"
      >
        <li
          :class="[option.value === selected ? 'text-green-light font-bold' : '', 'px-4 py-2 cursor-pointer hover:bg-indigo-700 hover:text-white']"
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
			selectedLabel: this.options.filter(option => option.value === this.value)[0].label,
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

