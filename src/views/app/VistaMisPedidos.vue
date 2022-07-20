<template>
  <CardLayout
    title="Pedidos Realizados"
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
        <Column field="horaPedido" header="Hora de pedido">
          <template #body="slotProps">
            <span>{{ (slotProps?.data?.horaInicio) }}</span>
          </template>
        </Column>
         <Column field="actions" header="">
          <template #item_pedidosCliente="{ item }">
              <div class="d-flex align-items-center">
                <span
                  >{{ item?.pedidosCliente?.length ?? 0 }} Pedido Registrado</span
                >
                <Button
                  icon="pi pi-eye"
                  class="p-button-rounded p-button-text ml-2"
                  @click="openFormPedido(item)"
                />
              </div>
            </template>
        </Column>
        <Column field="actions" header="">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text"
              @click="openRemove(slotProps?.data)"
              v-if="slotProps?.data?.orden !== 0"
            />
          </template>
        </Column>
      </DataTable>
      <SidebarMenu>
        <template #content>
          <FormUser
            @closeForm="closeForm"
            @fetchUsers="$store.dispatch('listarPedidos')"
          />
        </template>
      </SidebarMenu>

      <SidebarMenu ref="sidebarPedido" title="Detalles del pedido">
        <template #content>
          <FormPedido :pedido="Pedidos" no-form />
        </template>
      </SidebarMenu>
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
      await store.dispatch("listarPedidos");
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
  await store.dispatch("listarPedidos");
});
</script>

<script>
export default {
  name: "MisPedidosPage",
};
</script>

<style></style>
