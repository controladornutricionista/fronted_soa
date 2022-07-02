<template>
  <span class="chip">
    {{ text }}
  </span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "var(--color-primary-400)"
  },
  background: {
    type: String,
    default: "var(--color-primary-100)"
  },
})
</script>

<style lang="scss">
.chip {
  display: inline-flex;
  padding: 4px 6px;
  color: v-bind(color);
  background: v-bind(background);
  font-size: var(--font-size-xs);
  border-radius: var(--border-radius-md);

}
</style>