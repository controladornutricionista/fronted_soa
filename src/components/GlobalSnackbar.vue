<template>
  <v-snackbar
    v-if="snackbar.active"
    v-model="snackbar.active"
    class="snackbar"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    :top="position.top"
    :left="position.left"
    :right="position.right"
    :bottom="position.bottom"
    :centered="position.centered"
  >
    <v-alert :type="snackbar.type">
      <div class="alert__container">
        {{ snackbar.message }}
        <v-btn
          variant="fab"
          size="x-small"
          @click="
            $store.dispatch('activeSnackbar', { active: false, message: '' })
          "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            class="snackbar__svg"
          ><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" /></svg>
        </v-btn>
      </div>
    </v-alert>
  </v-snackbar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const positions = {
  "top-left": {
    top: true,
    left: true,
    right: false,
    bottom: false,
    centered: false,
  },
  "top-right": {
    top: true,
    left: false,
    right: true,
    bottom: false,
    centered: false,
  },
  "top-center": {
    top: true,
    left: false,
    right: false,
    bottom: false,
    centered: true,
  },
  "bottom-center": {
    top: false,
    left: false,
    right: false,
    bottom: true,
    centered: false,
  },
  "bottom-right": {
    top: false,
    left: false,
    right: true,
    bottom: true,
    centered: false,
  },
  "bottom-left": {
    top: false,
    left: true,
    right: false,
    bottom: true,
    centered: false,
  },
};

const snackbar = computed(() => store.getters.snackbar);
const position = computed(() => positions[store.getters.snackbar.position]);
</script>

<style lang="scss">
.snackbar {
  .alert__container {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .snackbar__actions button {
    margin-left: 4px;
    margin: auto 5px !important;
    display: inline-flex;
    align-items: center;
  }
  .v-snackbar__content,
  .v-snackbar__actions,
  .snackbar__svg,
  .snackbar__svg path {
    color: var(--color-white) !important;
    fill: var(--color-white) !important;
  }
  .v-snackbar__content {
    padding: 0 !important;
  }
}
</style>
