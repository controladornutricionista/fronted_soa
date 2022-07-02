<template>
  <v-app>
    <v-main>
      <router-view />
      <GlobalSnackbar />
      <Toast />
      <ConfirmDialog />
      <!-- <ToastError /> -->
      <span>{{ serverError }}</span>
    </v-main>
  </v-app>
</template>

<script>
import GlobalSnackbar from "@/components/GlobalSnackbar.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { computed, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";

export default {
  name: "App",
  components: { GlobalSnackbar, Toast, ConfirmDialog },
  setup() {
    const toast = useToast();
    const store = useStore();

    const serverError = computed(() => {
      const val = store.getters.getServerError;
      if (!val.message) return "";
      toast.add({
        severity: "error",
        summary: `Error ${val.errorCode}:`,
        detail: val.message,
        life: 10000,
      });
      return store.getters.getServerError;
    });

    watch(serverError, (val) => {
      console.log(val);
    });

    return {
      serverError,
    };
  },
};
</script>

<style lang="scss">
@import url("@/assets/scss/main.scss");
.form__container {
  h4,
  .form__title {
    font-weight: 600;
    font-size: var(--font-size-md);
  }
  label {
    display: block !important;
    font-weight: 600;
    font-size: var(--font-size-sm);
  }

  .p-inputtext,
  .p-dropdown,
  .p-inputtext,
  .p-inputnumber {
    width: 100% !important;
  }
  .p-multiselect-item span,
  input,
  textarea,
  .p-dropdown-label,
  .p-multiselect-label {
    font-size: var(--font-size-sm) !important;
  }
}
</style>
