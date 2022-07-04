<template>
  <CardLayout title="Inicio / Bienvenido" :icon="currentRoute.icon">
    <template #content>
      <div class="wrapper__init">
        <img :src="require('@/assets/bg2.jpg')" width="100%" class="bg-img" />
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

const headers = [
  {
    text: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    value: "name",
  },
  { text: "Calories", value: "calories" },
  { text: "Fat (g)", value: "fat" },
  { text: "Carbs (g)", value: "carbs" },
  { text: "Protein (g)", value: "protein" },
  { text: "Iron (%)", value: "iron" },
];
const desserts = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: "6%",
  },
];
</script>

<script>
export default {
  name: "HomePage",
};
</script>

<style lang="scss">
.bg-img {
  width: 100%;
  object-fit: cover;
  height: calc(100vh - 185px);
}

.wrapper__init {
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
