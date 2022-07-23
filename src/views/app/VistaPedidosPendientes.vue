<template>
  <CardLayout
    title="Pedidos Pendientes Realizados"
    :icon="currentRoute.icon"
    :nomostrarfooter="true"
    :nomostrarheaderanuncion="true"
    :nomostrarheaderbar="true"
  >
    <template #content>
      
      <DataTable :value="Pedidos" responsive-layout="scroll">
        <Column field="orden" header="#">
          <template #body="slotProps">
            <span>{{ slotProps.data?.orden }}</span>
          </template>
        </Column>
        <Column field="numeroPedido" header="Numero de Pedido">
          <template #body="slotProps">
            <span>
              {{ slotProps.data?._id }}
            </span>
          </template>
        </Column>
        <Column field="Usuario" header="Usuario">
          <template #body="slotProps">
            <span>
              {{ slotProps.data?.usuario?.nombres}}
              {{ slotProps.data?.usuario?.apellidos}}
            </span>
          </template>
        </Column>
        <Column field="Producto" header="Producto">
          <template #body="slotProps">
            <span>
              {{ slotProps.data?.producto?.name }}
            </span>
          </template>
        </Column>
        <Column field="PrecioFinal" header="PrecioFinal">
          <template #body="slotProps">
            <span>
              S/.{{ slotProps.data?.producto?.precioFinal }}
            </span>
          </template>
        </Column>
        <Column field="Estado" header="Estado">
          <template #body="slotProps">
            <ChipText
              :text="slotProps.data?.estado ? 'Pendiente' : 'Realizado'"
              :color="
                slotProps.data?.estado
                  ? 'var(--color-primary-500)'
                  : 'var(--color-danger-500)'
              "
              :background="
                slotProps.data?.estado
                  ? 'var(--color-primary-100)'
                  : 'var(--color-danger-100)'
              "
            />
          </template>
        </Column>
        <Column field="fechaCreacion" header="Fecha de pedido">
          <template #body="slotProps">
            <span>{{ formatPEDate(slotProps?.data?.fechaPedido) }}</span>
          </template>
        </Column>
        <Column field="horaPedidosssss" header="Hora de pedidos">
          <template #body="slotProps">
            <span>{{ (slotProps?.data?.horaInicio) }}</span>
          </template>
        </Column>
    
      </DataTable>
    </template>
  </CardLayout>
</template>

<script setup>
import CardLayout from "@/layouts/CardLayout.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import FormPedido from "@/components/forms/FormPedido.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import FormUser from "@/components/forms/FormUser.vue";
import ChipText from "@/components/chips/ChipText.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { loadImage } from "@/libs/loadImage";
import { momentDate,formatPEDate } from "@/libs/dateFormat";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";


const store = useStore();
const toast = useToast();
const confirm = useConfirm();

const currentRoute = computed(() => store.getters.getCurrentRouteActive);
const Pedidos = computed(() => store.getters.getPedidos);

const openFormPedido = (item) => {
  consulta.value = { ...item };
  sidebarConsulta.value.open();
};


const formatDate = (date) => {
    console.log(date);
    if(!date) return ""
    return new Intl.DateTimeFormat('es-PE').format(date)
    
}



const openRemove = (data) => {
  confirm.require({
    message: "¿Estás seguro que deseas eliminar a este pedido?",
    header: "Confirmación",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      const res = await store.dispatch("eliminarPedidos", data._id);
      await store.dispatch("listarTodoPedidos");
      res &&
        toast.add({
          severity: "info",
          summary: "Muy bien!",
          detail: "El pedido se ha removido!",
          life: 3000,
        });
    },
  });
};

onMounted(async () => {
  await store.dispatch("listarTodoPedidos");
});
</script>

<script>
export default {
  name: "MisPedidosPendientesPage",
};
</script>

<style></style>
