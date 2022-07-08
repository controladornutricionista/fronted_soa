<template>
  <form class="form__container" @submit.prevent="saveForm">
    <v-row>
      <v-col cols="12" class="pb-0" lg="12">
        <h4>Datos del empleado</h4>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Correo / usuario</label>
          <InputText v-model="user.usuario" :disabled="disabled" type="text" />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <label>Rol usuario</label>
        <Dropdown
          v-model="user.rol"
          :options="roles"
          option-label="nombre"
          option-value="_id"
          :disabled="disabled"
          placeholder=".:Selecciona un rol:."
        />
      </v-col>
      <v-col v-if="!userEdited" cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Contraseña</label>
          <InputText
            v-model="user.contrasena"
            :disabled="disabled"
            type="password"
          />
        </span>
      </v-col>
      <v-col v-if="!userEdited" cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Repetir contraseña</label>
          <InputText
            v-model="user.contrasena2"
            :disabled="disabled"
            type="password"
          />
        </span>
      </v-col>
      <v-col v-if="userEdited && !disabled">
      </v-col>
      <v-col cols="12" class="pb-1" lg="12">
        <label for="activeUser" class="mr-2">¿Usuario habilitado?</label>
        <Checkbox
          id="activeUser"
          v-model="user.activo"
          :binary="true"
          value="¿Usuario habilitado.?"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-2 mb-2 pt-4 pb-4" lg="12">
        <v-divider />
      </v-col>
    </v-row>

    <v-row v-if="user.rol && getRoleName() !== rolAdministrador">
      <v-col cols="12" class="pb-0" lg="12">
        <h4>Datos personales</h4>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Nombres</label>
          <InputText
            v-model="user.nombres"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Apellidos</label>
          <InputText
            v-model="user.apellidos"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
          <span>
          <label>DNI</label>
          <InputMask
            v-model="user.dni"
            :disabled="disabled"
            mask="99999999"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Celular</label>
           <InputMask
            v-model="user.celular"
            :disabled="disabled"
            mask="+51 999 999 999"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Direccion</label>
          <InputText
            v-model="user.direccion"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
    </v-row>
    <v-row v-if="!disabled">
      <v-col cols="12" class="d-flex justify-content-end">
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

const emit = defineEmits(["closeForm", "fetchUsers"]);
const props = defineProps({
  readonly: Boolean,
  userEdited: {
    type: Object,
    default: () => null,
  },
  isAdministrador: Boolean,
});

const loading = ref(false);
const disabled = ref(props.readonly);
const user = ref(
  props.userEdited
    ? {
        _id: props.userEdited?._id,
        rol: props.userEdited?.rol?._id ?? props.userEdited?.rol,
        activo: props.userEdited?.activo,
        usuario: props.userEdited?.usuario,
      }
    : {
        usuario: "",
        contrasena: "",
        contrasena2: "",
        rol: null,
        activo: true,
        nombres: "",
        apellidos: "",
        dni: "",
        celular: "",
        direccion: "",
      }
);



const baseURL = computed(() => store.getters.getBaseURL);
const roles = computed(() =>
  props.isAdministrador
    ? store.getters.getRoles.filter((rol) => rol?.nombre === "Empleado")
    : store.getters.getRoles
);
const rolAdministrador = computed(() => store.getters.rolAdministrador);

const getRoleName = () => {
  return roles.value.find(
    (rol) => rol._id === user.value.rol?._id || rol._id === user.value.rol
  )?.nombre;
};


const validateUserFields = () => {
  let errors = [];
  if (!user.value.usuario) errors.push("El usuario es requerido!");
  if (!user.value.contrasena) errors.push("La contraseña es requerida!");
  if (user.value.contrasena.length < 8)
    errors.push("La contraseña debe contener 8 carácteres como mínimo");
  if (
    user.value.contrasena &&
    !new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    ).test(user.value.contrasena)
  )
    errors.push(
      "La contraseña debe contener un número, un carácter especial @ y una letra mayúscula!"
    );
  if (user.value.contrasena != user.value.contrasena2)
    errors.push("Las contraseñas no coinciden!");
  if (!user.value.rol) errors.push("Debes elegir un rol!");
  if (!user.value.usuario) errors.push("El correo es requerido!");
  if (user.value.usuario && !/.+@.+\..+/.test(user.value.usuario))
    errors.push("Escribe un correo válido que contenga @ y un dominio válido!");
  for (const error of errors) {
    if (error != false) {
      toast.add({
        severity: "error",
        summary: "Atención:",
        detail: error,
        life: 5500,
      });
    }
  }
  return errors.length == 0;
};

const saveForm = async () => {
  if (!props.userEdited && !validateUserFields()) return;
  let users = null;
  try {
    loading.value = true;

    if (props.userEdited) {
      await store.dispatch("editarUsuario", {
        ...user.value,
        rol: user.value.rol?._id ?? user.value.rol,
        usuario: users?._id,
      });
    } else {
      await store.dispatch("crearUsuario", {
        ...user.value,
        rol: user.value.rol?._id ?? user.value.rol,
        usuario: user.value.usuario,
      });
    }
    loading.value = false;
    toast.add({
      severity: "success",
      summary: "Muy bien!",
      detail: "El usuario se guardó correctamente",
      life: 4500,
    });
    emit("closeForm");
    emit("fetchUsers");
  } catch (error) {
    console.log(error);
    loading.value = false;
    toast.add({
      severity: "warn",
      summary: "Error:",
      detail: "Ocurrió un error y no se pudo guardar",
      life: 4500,
    });
  }
  // se guarda solo usuario
};
</script>

<style lang="scss">
label {
  font-size: var(--font-size-sm);
}

input,
.p-dropdown-label,
.p-inputtext {
  font-size: var(--font-size-md);
}
</style>
