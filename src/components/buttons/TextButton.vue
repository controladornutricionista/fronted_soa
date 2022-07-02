<template>
  <button
    class="custom__button text__button rounded text-center"
    :class="{ 'small': small, 'medium': md }"
    type="submit"
    :disabled="disabled"
    :style="{ width: width, ...style }"
    @click="$emit('click')"
  >
    <template v-if="!loading">
      <slot name="icon" />
    </template>
    <span v-if="!loading">
      {{ label }}
    </span>
    <template v-else>
      <v-progress-circular
        indeterminate
        color="var(--primary-color-500)"
      />
    </template>
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  extraClass: {
    type: String,
    default: ""
  },
  small: Boolean,
  md: Boolean,
  width: {
    type: String,
    default: "auto"
  },
  color: {
    type: String,
    default: "white"
  },
  style: {
    type: Object,
    default: () => {}
  },
  loading: Boolean,
  disabled: Boolean
})

defineEmits(["click"])
</script>

<style lang="scss">
.custom__button {
  &.medium {
    height: var(--button-height-md) !important;
    font-size: var(--font-size-xs) !important;
    span {
      text-transform: initial;
    }
  }
  span {
    color: v-bind(color) !important;
  }
  &.small {
    height: var(--button-icon-xl) !important;
    svg {
      width: 14px !important;
      height: 14px !important;
    }
    span {
      font-size: var(--font-size-xs) !important;
      text-transform: initial;
    }
  }
}

button.text__button:disabled,
button.text__button[disabled]{
  border: 1px solid #999999 !important;
  background-color: #cccccc !important;
  color: #666666 !important;
  cursor: not-allowed;
}
</style>
