<template>
  <Sidebar
    v-model:visible="visible"
    :class="`sidebar__menu scrollable ${
      activeSidebar ? 'sidebar__menu-full-width' : ''
    } ${noHeader ? 'sidebar__menu--no--header' : ''}`"
    :base-z-index="zIndex"
    :position="position"
  >
    <template #header>
      <slot name="header">
        <h4>{{ title }}</h4>
      </slot>
    </template>
    <slot name="content" />
  </Sidebar>
</template>

<script setup>
import { ref, computed } from "vue";
import Sidebar from "primevue/sidebar";
import { useStore } from "vuex";

const store = useStore();
const activeSidebar = computed(() => store.getters.activeSidebar);

const props = defineProps({
  position: {
    type: String,
    default: "right",
  },
  title: {
    type: String,
    default: "Título",
  },
  zIndex: {
    type: Number,
    default: 10000,
  },
  width: {
    type: String,
    default: "50vw"
  },
  noHeader: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(false);

const open = () => {
  visible.value = true;
};

const close = () => {
  visible.value = false;
};

defineExpose({
  open,
  close,
});
</script>

<style lang="scss">
.p-component-overlay-enter {
  background: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(5px);
}
.sidebar__menu {
  z-index: 250;
  // top: var(--app-bar-height) !important;
  //width: calc(100vw - var(--sidebar-size));
  top: 0;
  width: 60vw;
  padding-bottom: 15px;
  transition: all ease-in-out 0.2s;

  &--no--header .p-sidebar-header {
    display: none !important;
  }
  @media screen and (max-width: 800px) {
    width: 90vw;
  }
  .p-sidebar-header,
  .p-sidebar-header h1,
  .p-sidebar-header h2,
  .p-sidebar-header h3,
  .p-sidebar-header h4 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 0 !important;
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
    font-size: var(--font-size-md);
    //background: var(--color-primary-400);
    // color: var(--color-white);
    text-transform: uppercase;
  }
  .p-sidebar-content {
    padding-top: 1rem !important;

    &::-webkit-scrollbar {
      width: 10px;
      height: 8px;
      z-index: 5;
    }

    &::-webkit-scrollbar-track {
      background: var(--color-fondo-dark);
    }

    &::-webkit-scrollbar-thumb {
      border: 2px solid var(--color-fondo-dark);
      background: var(--scroll-color);
      border-radius: 6px;
      z-index: 5;
      cursor: pointer !important;
    }
  }
  &.sidebar__menu-full-width {
    @media screen and (min-width: 801px) {
      width: 100vw !important;
    }
  }
  .p-dialog-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .dialog__subheader_title {
    font-size: var(--font-size-md);
    color: var(--color-primary-500);
    margin-bottom: 5px;
    text-transform: uppercase;
    font-weight: bold !important;
    span {
      font-weight: bold !important;
    }
  }
  .p-sidebar-close {
    /* .p-sidebar-close-icon  {
      color: var(--color-white);
    } */
    &:hover {
      .p-sidebar-close-icon  {
        color: var(--color-primary-500);
      }
    }
  }
}
</style>
