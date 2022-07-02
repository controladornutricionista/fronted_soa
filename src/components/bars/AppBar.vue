<template>
  <div class="appbar">
    <div class="appbar__container">
      <span
        class="appbar__hamburger"
        @click="changeActiveSidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
          />
        </svg>
      </span>
      <p
        :key="10"
        class="appbar__title"
      />
      <div class="bar__actions">
        <AuthMenu />
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthMenu from "@/components/menus/AuthMenu.vue"
// import NotifyMenu from "@/components/menus/NotifyMenu.vue"
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

// variables
const route = useRoute();
const store = useStore();

// computed
const activeSidebar = computed(() => store.getters.activeSidebar);
// methods
const changeActiveSidebar = () =>
  store.commit('setActiveSidebar', !activeSidebar.value)
</script>

<style lang="scss">
.appbar {
  position: sticky;
  top: 0;
  // background: var(--color-white);
  backdrop-filter: blur(5px);
  z-index: 10;
  height: var(--app-bar-height);
  .bar__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__container {
    padding: 0.8rem 1rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-items: flex-start;
    grid-gap: 2rem;
  }
  &__hamburger {
    width: 1.4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    path {
      fill: var(--color-primary-400);
    }
  }
  &__title {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary-400);
    margin: 0;
    line-height: 1;
  }
}
</style>
