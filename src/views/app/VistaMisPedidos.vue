<template>
  <CardLayout
    title="Pedidos"
    :icon="currentRoute.icon"
    :nomostrarfooter="true"
    :nomostrarheaderanuncion="true"
    v-bind:nomostrarheaderbar="true"
  >
    <template #content>
      <div class="controls__table">
        <span />
        <Button
          icon="pi pi-plus"
          class="p-button-rounded p-button-secondary"
          :style="{ background: 'var(--color-primary-500)' }"
          @click="openForm"
        />
      </div>
      <DataTable :value="Empleados" responsive-layout="scroll">
        <Column field="orden" header="#">
          <template #body="slotProps">
            <span>{{ slotProps.data?.orden }}</span>
          </template>
        </Column>
        <Column field="nombres" header="Numero de Pedido">
          <template #body="slotProps">
            <span>
              {{ slotProps.data?.nombres }}
              {{ slotProps.data?.apellidos }}
            </span>
          </template>
        </Column>
        <Column field="dniempleado" header="Usuario">
          <template #body="slotProps">
            <span>
              {{ slotProps.data?.dni }}
            </span>
          </template>
        </Column>
        <Column field="celularempleado" header="Producto">
          <template #body="slotProps">
            <span>
              {{ slotProps.data?.celular }}
            </span>
          </template>
        </Column>
          <Column field="celularempleado" header="Ensalada">
          <template #body="slotProps">
            <span>
              {{ slotProps.data?.celular }}
            </span>
          </template>
        </Column>
        <Column field="rol" header="Estado">
          <template #body="slotProps">
            <ChipText
              :text="slotProps.data?.rol?.nombre"
              :color="'black'"
              :background="slotProps.data?.rol?.color"
            />
          </template>
        </Column>
        <Column
          v-for="(item, idx) in headers"
          :key="idx + 1000"
          :field="item.value"
          :header="item.text"
        />

        <Column field="activo" header="Unidad">
          <template #body="slotProps">
            <ChipText
              :text="slotProps.data?.activo ? 'Habilitado' : 'Inhabilitado'"
              :color="
                slotProps.data?.activo
                  ? 'var(--color-primary-500)'
                  : 'var(--color-danger-500)'
              "
              :background="
                slotProps.data?.activo
                  ? 'var(--color-primary-100)'
                  : 'var(--color-danger-100)'
              "
            />
          </template>
        </Column>
        <Column field="fechaCreacion" header="Fecha creación">
          <template #body="slotProps">
            <span>{{ momentDate(slotProps?.data?.fechaCreacion) }}</span>
          </template>
        </Column>
         <Column field="fechaCreacion" header="Comentarios">
          <template #body="slotProps">
            <span>{{ momentDate(slotProps?.data?.fechaCreacion) }}</span>
          </template>
        </Column>
        <Column field="actions" header="">
          <template #body="slotProps">
            <Button
              icon="pi pi-user-edit"
              class="p-button-rounded p-button-text"
              @click="openFormEdit(slotProps?.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text"
              @click="openRemove(slotProps?.data)"
              v-if="slotProps?.data?.orden !== 0"
            />
          </template>
        </Column>
      </DataTable>
      <SidebarMenu ref="sidebar" :title="titleSidebar">
        <template #content>
          <FormUser
            @closeForm="closeForm"
            @fetchUsers="$store.dispatch('listarEmpleados')"
            :userEdited="editedUser"
          />
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
import SidebarMenu from "@/components/SidebarMenu.vue";
import FormUser from "@/components/forms/FormUser.vue";
import ChipText from "@/components/chips/ChipText.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { loadImage } from "@/libs/loadImage";
import { momentDate } from "@/libs/dateFormat";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const store = useStore();
const toast = useToast();
const confirm = useConfirm();

const sidebar = ref();

const editedUser = ref(null);

const titleSidebar = computed(() =>
  editedUser.value ? "Editar Empleado" : "Crear Empleado"
);
const currentRoute = computed(() => store.getters.getCurrentRouteActive);
const Empleados = computed(() => store.getters.getUsuarios);
const headers = [{ text: "Empleado", value: "usuario" }];

const openForm = () => {
  sidebar.value.open();
};

const closeForm = () => {
  sidebar.value.close();
  editedUser.value = null;
};

const openFormEdit = (data) => {
  editedUser.value = { ...data };
  openForm();
};

const openRemove = (data) => {
  confirm.require({
    message: "¿Estás seguro que deseas eliminar a este usuario?",
    header: "Confirmación",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      const res = await store.dispatch("eliminarUsuario", data._id);
      await store.dispatch("listarEmpleados");
      res &&
        toast.add({
          severity: "info",
          summary: "Muy bien!",
          detail: "El usuario se ha removido!",
          life: 3000,
        });
    },
  });
};

onMounted(async () => {
  await store.dispatch("listarEmpleados");
  await store.dispatch("listarRoles");
});
</script>

<script>
export default {
  name: "UsuariosPage",
};
</script>

<style></style>
