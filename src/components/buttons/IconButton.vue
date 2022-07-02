<template>
  <button
    class="icon__button"
    :class="{
      'icon__button--rounded-bg': fab,
      'icon__button--small': small,
      'icon__button--x-small': xSmall,
    }"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <template v-if="!loading">
      <slot name="icon" />
    </template>
    <template v-else>
      <v-progress-circular
        indeterminate
        color="var(--primary-color-500)"
      />
    </template>
  </button>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  fab: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "submit",
  },
  small: {
    type: Boolean,
    default: false,
  },
  xSmall: {
    type: Boolean,
    default: false,
  },
  disabled: Boolean,
  loading: Boolean,
  onClick: {
    type: Function,
    default: () => {},
  },
  color: {
    type: String,
    default: null,
  },
});

const currentColor = ref(
  props.color ? props.color : "var(--color-primary-400)"
);

defineEmits(["click"]);
</script>

<style lang="scss">
.icon__button {
  background: v-bind(currentColor);
  margin: 0 1px !important;
  width: var(--button-icon-lg);
  height: var(--button-icon-lg);
  border-radius: 50%;
  margin: auto 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease-in-out 0.2s;
  padding: 6px;
  svg {
    fill: var(--color-primary-300);
    width: 16px;
    height: 16px;
  }

  &--x-small {
    width: var(--button-icon-sm) !important;
    height: var(--button-icon-sm) !important;
    padding: 6px;
    svg {
      width: 14px !important;
      height: 14px !important;
      path {
        fill: var(--color-white) !important;
      }
    }
  }
  &--rounded-bg {
    box-shadow: var(--box-shadow);
    padding: 8px;
    &:hover {
      background: var(--color-primary-400);
    }
    svg {
      width: 16px;
      height: 16px;
      path {
        fill: var(--color-white) !important;
      }
    }
    i {
      color: var(--color-white) !important;
    }
  }
  &--small {
    width: var(--button-icon-sm);
    height: var(--button-icon-sm);
    svg {
      width: 15px !important;
      width: 15px !important;
    }
  }
  &:active {
    transform: scale(0.94);
  }
  &:hover {
    background: v-bind(currentColor);
    opacity: 0.85 !important;
  }
}

button.icon__button:disabled,
button.icon__button[disabled] {
  border: 1px solid #999999 !important;
  background-color: #cccccc !important;
  color: #666666 !important;
  cursor: not-allowed;
}
</style>
