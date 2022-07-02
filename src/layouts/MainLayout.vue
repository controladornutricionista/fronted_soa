<template>
  <div :class="`main__layout ${activeSidebar ? 'main__layout--active' : ''}`">
    <SideBar />
    <main class="main__container scrollable">
      <AppBar />
      <div class="main__content">
        <router-view v-slot="{ Component, route }">
          <transition
            :name="route.meta.transition || 'fade'"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
    <div
      class="overlay__menu"
      @click="closeSidebar"
    />
    <LoaderPage />
  </div>
</template>

<script setup>
import SideBar from "@/components/bars/SideBar.vue";
import AppBar from "@/components/bars/AppBar.vue";
import LoaderPage from "@/components/LoaderPage.vue";
import { useStore } from "vuex";
import { computed } from "vue";

// variables
const store = useStore();

// computed
const activeSidebar = computed(() => store.getters.activeSidebar);

// methods
const closeSidebar = () => store.commit("setActiveSidebar", false);
</script>

<style lang="scss">
.main__layout {
  display: grid;
  grid-template-columns: var(--sidebar-size) 1fr;
  height: 100vh;
  transition: all ease-in-out 0.2s;

  @media screen and(max-width: 800px) {
    grid-template-columns: 1fr;

    .main__container {
      width: 100%;
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: calc(-1 * var(--sidebar-size));
    }

    &.main__layout--active {
      .sidebar {
        left: 0;
      }

      .overlay__menu {
        z-index: 200;
      }
    }

    .overlay__menu {
      position: fixed;
      transition: background ease-in-out 0.25s;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(5px);
      top: 0;
      width: 100%;
      height: 100vh;
      z-index: -100;
    }
  }

  @media screen and(min-width: 801px) {
    &.main__layout--active {
      .main__container {
        margin-left: calc(-1 * var(--sidebar-size));
        width: calc(100% + var(--sidebar-size));
      }

      .sidebar {
        margin-left: calc(-1 * var(--sidebar-size));
      }
    }
  }

  .main__content {
    padding: 0.8rem 1rem;
  }
}

.main__container {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  transition: all ease-in-out 0.25s;
  background: var(--color-fondo-dark);
  overflow-y: scroll;
}

.scrollable::-webkit-scrollbar {
  width: 9px;
  height: 8px;
  z-index: 5;
}

.scrollable::-webkit-scrollbar-track {
  background: var(--color-fondo-dark);
}

.scrollable::-webkit-scrollbar-thumb {
  border: 2px solid var(--color-fondo-dark);
  background: var(--color-primary-600);
  border-radius: 4px;
  z-index: 5;
}

// Custom transitions vue router
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// slide style
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-to {
  position: absolute;
  opacity: 0;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  opacity: 0;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  opacity: 0;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  opacity: 1;
  left: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

// scale style
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
