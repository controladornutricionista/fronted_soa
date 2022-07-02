<template>
  <div
    :class="`loader__page ${loader ? 'active-loader' : ''}`"
    :style="`z-index: ${zIndex ? zIndex : 200}`"
  >
    <div class="loading">
      <img
        id="loading"
        :src="logo"
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  color: {
    type: String,
    default: String,
  },
  zIndex: {
    type: Number,
    default: 255,
  },
});

const store = useStore();

const logo = computed(() => store.getters.dataBase?.application?.logo);
const loader = computed(() => store.getters.loader);
</script>

<style lang="scss" scoped>
.loader__page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: all ease-in-out 0.25s;
  background: rgba(15, 49, 90, 0.71);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
}

.loader__page.active-loader {
  visibility: visible;
  opacity: 1;
}

body {
  background: #ccc;
}
#loading {
  max-width: 100%;
  height: auto;
  cursor: pointer;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -60px 0 0 -60px;
  background: #fff;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 10px solid var(--color-primary-500);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading:after {
  content: "";
  background: trasparent;
  width: 140%;
  height: 140%;
  position: absolute;
  border-radius: 100%;
  top: -20%;
  left: -20%;
  opacity: 0.7;
  box-shadow: rgba(255, 255, 255, 0.6) -4px -5px 3px -3px;
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
