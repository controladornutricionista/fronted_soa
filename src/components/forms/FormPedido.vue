<template>
  <div>
    <form class="form__container" @submit.prevent="loadPaymentForm">
      <v-row>
        <v-col cols="12" class="pb-0" lg="12">
          <h4>Datos del pedido</h4>
        </v-col>

        <v-col cols="12" lg="6" md="6" sm="12">
          <img
            :src="loadImage(pedido.producto.img)"
            :style="{ maxWidth: '100%' }"
            alt=""
          />
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="12">
          <v-row>
            <v-col cols="12" lg="12" sm="12" class="pb-0">
              <p>
                <strong>{{ pedido.producto.name }}</strong>
              </p>
            </v-col>
            <v-col cols="12" lg="12" sm="12">
              <label>Precio base</label>
              <p>
                <strong>S/{{ pedido.producto.precio }}</strong>
              </p>
              <small>{{ pedido.producto?.descripcion }}</small>
            </v-col>
            <v-col
              cols="12"
              lg="12"
              sm="12"
              v-for="(extra, idx) in pedido.producto.extras"
              :key="`ex_${idx}_${pedido.producto.id}`"
            >
              <div class="item__extra">
                <strong
                  >{{ extra.name }}
                  <small>S/ {{ extra.precio }}.00</small>
                </strong>
                <div class="extra__input">
                  <button
                    type="button"
                    @click="
                      () => {
                        extra.cantidad > 0 && extra.cantidad--;
                        actualizarTotal();
                      }
                    "
                  >
                    -
                  </button>
                  <InputNumber
                    v-model="extra.cantidad"
                    @keyup="actualizarTotal()"
                    @change="actualizarTotal()"
                    :min="0"
                  ></InputNumber>
                  <button
                    type="button"
                    @click="
                      () => {
                        extra.cantidad++;
                        actualizarTotal();
                      }
                    "
                  >
                    +
                  </button>
                </div>
              </div>
            </v-col>
            <v-col v-if="pedido.producto.gaseosas" cols="12" lg="12" sm="12">
              <div class="item__extra">
                <strong>Elige tu gaseosa</strong>
                <div class="extra__input">
                  <Dropdown
                    placeholder=".:Selecciona una (opcional):."
                    showClear
                    @change="actualizarTotal()"
                    :options="pedido.producto.gaseosas"
                    v-model="pedido.producto.gaseosa"
                    option-label="name"
                  ></Dropdown>
                </div>
              </div>
            </v-col>
            <v-col cols="12" lg="12" sm="12">
              <div class="price__row">S/ {{ pedido.producto.precioFinal }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-if="!disabled">
        <v-col cols="12" class="d-flex justify-content-end mt-4 pt-4">
          <TextButton
            type="submit"
            label="Ir a pagar"
            md
            :loading="loading"
            :diasbled="loading"
            :style="{ background: 'var(--color-primary-400)' }"
          />
        </v-col>
      </v-row>
    </form>
    <Dialog
      header="Formulario de pago"
      v-model:visible="displayModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '500px' }"
      :modal="true"
    >
      <FormPayment
        @paymentSuccess="registrarPedido"
        :total="pedido.producto.precioFinal"
      ></FormPayment>
      <template #footer> </template>
    </Dialog>
  </div>
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
import Dialog from "primevue/dialog";
import FormPayment from "@/components/forms/FormPayment.vue";
import { useStore } from "vuex";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { loadImage } from "@/libs/loadImage";

const store = useStore();
const toast = useToast();

const emit = defineEmits(["closeForm", "fethPedidos"]);
const props = defineProps({
  readonly: Boolean,
  isEdited: Boolean,
  menu: {
    type: Object,
    default: null,
  },
  PedidoEdited: {
    type: Object,
    default: () => null,
  },
});

const displayModal = ref(false);
const loading = ref(false);
const disabled = ref(props.readonly);
const pedido = ref(
  props.PedidoEdited
    ? { ...props.PedidoEdited }
    : {
        producto: {
          ...props.menu,
          gaseosa: null,
          precioFinal: 0,
        }, //
        fechaPedido: "", //
        horaInicio: "", //
        usuario: "",
        numeroTarjeta: "", //
        estado: "", //
      }
);

const baseURL = computed(() => store.getters.getBaseURL);
const usuarios = computed(() => store.getters.getUsuarios);

const loadPaymentForm = () => {
  displayModal.value = true;
};

const actualizarTotal = () => {
  let total = pedido.value.producto?.precio ?? 0;
  let totalExtras = 0;
  pedido.value.producto?.extras?.forEach((extra) => {
    totalExtras += extra.precio * extra.cantidad;
  });

  total += totalExtras;

  total += pedido.value.producto?.gaseosa?.precio ?? 0;

  pedido.value.producto.precioFinal = total;
};

const registrarPedido = async (creditNumber) => {
  try {
    displayModal.value = false;

    const dto = {
      ...pedido.value,
      producto: JSON.parse(JSON.stringify(pedido.value.producto)),
      fechaPedido: new Date().toISOString().substring(0, 10),
      horaInicio: new Date().toISOString().substring(11, 16),
      usuario: store.getters?.getIdUser,
      estado: "Pendiente",
      numeroTarjeta: creditNumber,
    };
    loading.value = true;
    const res = await store.dispatch("crearPedidos", dto);
    loading.value = false;
    if (!res) return;

    toast.add({
      severity: "success",
      summary: `Muy bien!`,
      detail: "Tu pedido se ha registrado correctamente!",
      life: 4500,
    });

    emit("closeForm");
  } catch (error) {
    loading.value = false;
  }
};

onMounted(() => {
  actualizarTotal();
});

onUpdated(() => {
  console.log("updated", pedido.value);
});
</script>

<style lang="scss">
.item__extra {
  display: flex;
  gap: 30px;
  align-items: center;
  strong {
    flex-basis: 100px;
    text-transform: capitalize;
    display: flex;
    flex-flow: column nowrap;
  }
  .extra__input {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    button {
      min-width: 30px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--color-primary-300);
    }
  }
}
.price__row {
  display: flex;
  justify-content: flex-end;
  font-size: 35px;
  font-weight: bold;
}
</style>
