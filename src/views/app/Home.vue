<template>
  <CardLayout title="Inicio / Bienvenido" :icon="currentRoute.icon" :nomostrarfooter="true" :nomostrarheaderanuncion="true" v-bind:nomostrarheaderbar="true">
    <template #content>
      <div class="wrapper__init2">
        <img :src="require('@/assets/coco.jpg')" width="100%" class="bg-img2" />
        <h1>
          {{ "Bienvenido" }} <span>{{ $store.getters.getUserFullname }}</span>
        </h1>
      </div>
    </template>
  </CardLayout>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

import CardLayout from "@/layouts/CardLayout.vue";
import DataTable from "@/components/datatable/Datatable.vue";

const store = useStore();

const currentRoute = computed(() => store.getters.getCurrentRouteActive);

</script>

<script>
export default {
  name: "HomePage",
};
</script>

<style lang="scss">
.bg-img2 {
  width: 100%;
  object-fit: fill;
  height: calc(100vh - 126px);
  margin: auto;
}

.wrapper__init2 {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.48);
  }
  h1 {
    font-weight: bold;
    font-size: clamp(35px, 5vw, 50px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    color: white;
    span {
      font-weight: bold;
      font-size: clamp(35px, 5vw, 50px);
      color: var(--color-primary-400) !important;
    }
  }
}
</style>
