<template>
  <Toast></Toast>
</template>

<script setup>
import { computed, watch } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";

const toast = useToast();
const store = useStore();

const serverError = computed(() => {

  console.log(store.getters.getServerError);
  return store.getters.getServerError
});

watch(serverError, (val) => {
  console.log(val);
  toast.add({
    severity: "warn",
    summary: `Error ${val.errorCode}:`,
    detail: val.message,
    life: 4500,
  });
});
</script>

<style></style>
