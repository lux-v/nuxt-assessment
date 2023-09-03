<!-- 
	testing out the emit function
	https://v3.vuejs.org/guide/component-basics.html#emitting-a-value-with-an-event
 -->
<template>
	<svgo-icon-menu @click="emit('toggle')" :class="classes" />
</template>

<script setup>
const props = defineProps({
	isOpened: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(['toggle']);

const classes = computed(() => {
	return ['icon-menu', { 'is-opened': props.isOpened }];
});
</script>

<style lang="scss" scoped>
.icon-menu {
	width: 30px;
	height: 12px;
	cursor: pointer;
	user-select: none;
	stroke: var(--rpsg-yellow);
}
</style>
