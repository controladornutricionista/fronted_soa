<template>
  <form class="form__container" @submit.prevent="saveForm">
    <v-row>
      <v-col cols="12" class="pb-0" lg="12">
        <h4>Datos del pedido</h4>
      </v-col>
      <v-col
        v-if="alimento.imagen"
        cols="12"
        lg="12"
        class="pb-1 d-flex justify-content-center"
        md="12"
      >
        <img
          class="mx-auto"
          height="80"
          draggable="false"
          :src="loadImage(alimento.imagen?.src)"
          alt=""
        />
      </v-col>
      <v-col cols="12" class="pb-1" lg="8" md="9" sm="12">
        <span>
          <label>Nombre</label>
          <InputText
            v-model="alimento.nombre"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="4" md="3" sm="12">
        <span>
          <label>Categoría</label>
          <Dropdown
            v-model="alimento.categoria"
            :disabled="disabled"
            :options="categorias"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="12" md="12">
        <span>
          <label>Detalles</label>
          <Textarea
            v-model="alimento.descripcion"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="3" md="6" sm="12">
        <span>
          <label>Kcal</label>
          <InputNumber
            v-model="alimento.kcal"
            mode="decimal"
            :minFractionDigits="2"
            :maxFractionDigits="5"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="3" md="6" sm="12">
        <span>
          <label>Grasas (gr)</label>
          <InputNumber
            v-model="alimento.grasas"
            mode="decimal"
            :minFractionDigits="2"
            :maxFractionDigits="5"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="3" md="6" sm="6">
        <span>
          <label>Medida casera</label>
          <Dropdown
            v-model="alimento.medidaCasera"
            :disabled="disabled"
            :options="medidasCaseras"
            option-label="name"
            option-value="sku"
            @change="onChangeMedidaCasera"
          />
        </span>
      </v-col>
      <v-col cols="12" lg="3" md="6" sm="6">
        <span>
          <label>Cantidad Medida</label>
          <InputNumber v-model="alimento.cantidadMedida" />
        </span>
      </v-col>
      <v-col cols="12" lg="12" md="12">
        <span>
          <label>Nutrientes que contiene este alimento</label>
          <MultiSelect
            class="d-flex w-100"
            v-model="alimento.nutrientes"
            :disabled="disabled"
            :options="nutrientes"
            placeholder=".:Selecciona los nutrientes de este alimento:."
          />
        </span>
      </v-col>

      <v-col v-if="PeidoEdited && !disabled">
        <FileUpload
          name="file"
          @upload="onUpload"
          :multiple="false"
          accept="image/*"
          :url="baseURL + '/archivos'"
          chooseLabel="Subir imagen del alimento"
          :maxFileSize="1000000"
          :auto="true"
          mode="basic"
          :fileLimit="1"
        >
        </FileUpload>
      </v-col>
    </v-row>

    <v-row v-if="!disabled">
      <v-col cols="12" class="d-flex justify-content-end mt-4 pt-4">
        <TextButton
          type="submit"
          label="Guardar"
          md
          :loading="loading"
          :diasbled="loading"
          :style="{ background: 'var(--color-primary-400)' }"
        />
      </v-col>
    </v-row>
  </form>
</template>

<script setup>
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputMask from "primevue/inputmask";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Checkbox from "primevue/checkbox";
import TextButton from "@/components/buttons/TextButton.vue";
import FileUpload from "primevue/fileupload";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { loadImage } from "@/libs/loadImage";

const store = useStore();
const toast = useToast();

const emit = defineEmits(["closeForm", "fethPedidos"]);
const props = defineProps({
  readonly: Boolean,
  PeidoEdited: {
    type: Object,
    default: () => null,
  },
});

const loading = ref(false);
const disabled = ref(props.readonly);
const pedido = ref(
  props.PeidoEdited
    ? { ...props.PeidoEdited }
    : {
        producto: "", //
        fechaPedido: "", //
        horaInicio: "", //
        usuario: "",
        numeroTarjeta: "", //
        estado: "", //
      }
);

const baseURL = computed(() => store.getters.getBaseURL);
const usuarios = computed(() => store.getters.getUsuarios);

</script>

<style lang="scss"></style>
