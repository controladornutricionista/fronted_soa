<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__header">
        <div class="d-flex w-100 justify-center">
          <UserAvatar size="x-large" />
        </div>
        <p class="sidebar__name">
          {{ fullname }}
        </p>
        <p class="sidebar__code">
          {{ code }}
        </p>
        <p class="sidebar__code sidebar__role">
          {{ role }}
        </p>
      </div>
      <div class="sidebar__content">
        <ul class="sidebar__list">
          <li
            v-for="item in userRoutes"
            :key="item.to"
            class="sidebar__item"
          >
            <router-link
              :class="`sidebar__link ${
                isOnActualRoute(item.to) ? 'sidebar__link--active' : ''
              }`"
              :to="item.to"
              @click="redirectToPath(item.to)"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span
                class="sidebar__link_icon"
                v-html="item.icon"
              />
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>

      <copy-right />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import UserAvatar from "@/components/avatars/UserAvatar.vue";
import CopyRight from "@/components/CopyRight.vue";

// variables
const route = useRoute();
const router = useRouter();
const store = useStore();

const code = computed(() => store.getters.getUserId);
const fullname = computed(() => store.getters.getUserFullname);
const role = computed(() => store.getters.getUserRole);
const userRoutes = computed(() => store.getters.getUserRoutes);

const redirectToPath = (path) => {
  router.push(path);
};

// Methods
const isOnActualRoute = (actualRoutePath) => {
  return route.path === actualRoutePath;
};
</script>

<style scope lang="scss">
// @import "@/assets/sass/main.scss";

.sidebar {
  background-color: var(--color-white);
  width: var(--sidebar-size);
  height: 100vh;
  transition: all ease-in-out 0.25s;

  @media screen and (max-width: 800px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 1.4rem 1rem;
  }
  &__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    color: var(--color-primary-800);
    padding: 5px 10px 12px;
    margin-bottom: 10px;
    * {
      position: relative;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: calc(100% - 40px);
      //background: var(--color-primary-200);
      border-radius: var(--border-radius-sm);
      width: 100%;
      box-shadow: var(--box-shadow);
      border: 1.5px solid var(--color-primary-100);
    }
  }

  &__name {
    font-weight: bold;
    color: var(--color-white);
    margin-top: 0;
    margin-bottom: 0rem;
    color: var(--color-primary-700);
    font-size: 0.93rem;
    margin-top: 0px;
    font-weight: 700;
  }
  &__code {
    font-size: 0.75rem;
    color: var(--color-primary-300);
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--color-text-gray);
    margin-bottom: 0px;
    margin-bottom: 3px;
  }
  &__role {
    padding: 2px 10px;
    border-radius: var(--border-radius-md);
    background: var(--color-primary-500);
    color: var(--color-white);
  }
  &__content {
    width: 100%;
  }
  &__list {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 0;
  }
  &__item {
    list-style: none;
    margin: 0.2rem 0;
    width: 100%;
    text-align: center;
  }
  &__link {
    display: flex;
    align-items: center;
    padding: 0.76rem 1rem;
    // border-radius: 8px;
    font-size: 13px;
    text-decoration: none;
    color: var(--color-text-gray);
    font-weight: 500;
    transition: all ease-in-out 0.2s;
    border-radius: var(--border-radius-sm);
    // border-left: 4px solid var(--color-secondary-500);
    box-shadow: var(--box-shadow);
    svg {
      width: 1.2rem;
      margin-right: 1rem;
      transition: color ease-in-out 0.2s;
      path {
        fill: var(--color-text-gray);
      }
    }
    &--active {
      background-color: var(--color-primary-500) !important;
      border-left: 4px solid var(--color-secondary-500) !important;
      box-shadow: var(--box-shadow);
      font-weight: 600;
      color: var(--color-white);
      svg {
        path {
          fill: var(--color-white) !important;
        }
      }
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border-left: 4px solid var(--color-secondary-500);
      box-shadow: var(--box-shadow);
    }
    &_icon {
      display: inline-flex;
      align-items: center;
    }
  }

  .copyright {
    position: fixed;
    bottom: 15px;
    color: var(--color-text-gray-bold);
    font-size: var(--font-size-sm);
    a {
      color: var(--color-text-gray-bold);
      font-weight: 600;
      text-decoration: none;
    }
  }
}
</style>
