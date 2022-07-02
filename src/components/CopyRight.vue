<template>
  <div class="copyright">
    <p>
      &copy; {{ copyright.anio }} -
      <a
        :href="copyright.enlace"
        target="_blank"
      >{{ copyright.nombre }}</a>
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const copyright = computed(() => store.getters.dataBase.copyrigth);
</script>

<style lang="scss">
.copyright {
  color: var(--color-white);
  font-size: var(--font-size-sm);

  &_dark {
    color: var(--color-text-gray-bold) !important;

    a {
      color: var(--color-text-gray-bold) !important;
    }
  }

  &_center {
    text-align: center;
  }

  a {
    color: var(--color-white);
    font-weight: 600;
    text-decoration: none;
  }
}
</style>
