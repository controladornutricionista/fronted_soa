<template>
  <form class="form__container" @submit.prevent="saveForm">
    <v-row>
      <v-col cols="12" class="pb-0" lg="12">
        <h4>Datos del empleado</h4>
      </v-col>
      <v-col
        v-if="user.imagen"
        cols="12"
        lg="12"
        class="pb-1 d-flex justify-content-center"
        md="12"
      >
        <img
          class="mx-auto"
          height="80"
          :src="loadImage(user.imagen?.src)"
          alt=""
        />
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
        <FileUpload
          name="file"
          @upload="onUpload"
          :multiple="false"
          accept="image/*"
          :url=" baseURL + '/archivos' "
          chooseLabel="Subir imagen de perfil"
          :maxFileSize="1000000"
          :auto="true"
          mode="basic"
          :fileLimit="1"
        >
        </FileUpload>
      </v-col>
      <v-col cols="12" class="pb-1" lg="12">
        <label for="activeUser" class="mr-2">¿Usuario habilitado?</label>
        <Checkbox
          id="activeUser"
          v-model="user.activo"
          :binary="true"
          value="¿Usuario habilitado?"
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
            v-model="persona.nombres"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Apellidos</label>
          <InputText
            v-model="persona.apellidos"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>DNI</label>
          <InputText v-model="persona.dni" :disabled="disabled" />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Celular</label>
          <InputText
            v-model="persona.celular"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Teléfono</label>
          <InputText
            v-model="persona.telefono"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label for="date">Fecha Nacimiento</label>
          <InputText
            v-model="persona.fechaNacimiento"
            :disabled="disabled"
            type="date"
          />
        </span>
      </v-col>
      <v-col cols="12" class="pb-1" lg="6" md="12">
        <span>
          <label>Correo personal</label>
          <InputText v-model="persona.email" :disabled="disabled" type="text" />
        </span>
      </v-col>

      <v-col cols="12" class="pb-1" lg="12" md="12">
        <span>
          <label>Ocupación</label>
          <InputText
            v-model="persona.ocupacion"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>

      <v-col cols="12" class="pb-1" lg="12" md="12">
        <span>
          <label>Detalles extra</label>
          <Textarea
            v-model="persona.detallesExtra"
            :disabled="disabled"
            type="text"
          />
        </span>
      </v-col>
    </v-row>

    <v-row v-if="rolPaciente == getRoleName()">
      <v-col cols="12" lg="12" class="mt-2 mb-2 pt-4 pb-4">
        <v-divider />
      </v-col>
    </v-row>

    <v-row v-if="rolPaciente == getRoleName()">
      <v-col cols="12" lg="12" class="pb-0">
        <h4>Datos de paciente</h4>
      </v-col>

      <v-col cols="12" lg="12" md="12">
        <span>
          <label>Enfermedades</label>
          <MultiSelect
            class="d-flex w-100"
            v-model="persona.enfermedades"
            :disabled="disabled"
            :options="enfermedades"
            placeholder=".:Selecciona enfermedades del paciente:."
          />
        </span>
      </v-col>
      <v-col cols="12" lg="4" md="6">
        <label>Estatura (cm)</label>
        <InputNumber 
          class="d-flex w-100"
          v-model="persona.estatura"
          :disabled="disabled"
          mode="decimal" 
          :minFractionDigits="2"
        />
      </v-col>
      <v-col cols="12" lg="4" md="6">
        <label>Peso (kg)</label>
        <InputNumber 
          class="d-flex w-100"
          v-model="persona.peso"
          :disabled="disabled"
          mode="decimal" 
          :minFractionDigits="2"
        />
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
  isEmpleado: Boolean
});

const loading = ref(false);
const disabled = ref(props.readonly);
const user = ref(
  props.userEdited
    ? {
        _id: props.userEdited?._id,
        rol: props.userEdited?.rol?._id ?? props.userEdited?.rol,
        activo: props.userEdited?.activo,
        imagen: props.userEdited?.imagen,
        usuario: props.userEdited?.usuario,
      }
    : {
        usuario: "",
        contrasena: "",
        contrasena2: "",
        rol: null,
        activo: true,
        imagen: null,
      }
);

const usuario = ref(
  props.userEdited?.usuario
    ? { ...props.userEdited?.usuario }
    : {
        nombres: "",
        apellidos: "",
        dni: "",
        celular: "",
        direccion: ""
      }
);

const baseURL = computed(() => store.getters.getBaseURL);
const roles = computed(() => props.isEmpleado ? store.getters.getRoles.filter(rol => rol?.nombre === 'Empleado')  : store.getters.getRoles);
const rolAdministrador = computed(() => store.getters.rolAdministrador);


const getRoleName = () => {
  return roles.value.find(
    (rol) => rol._id === user.value.rol?._id || rol._id === user.value.rol
  )?.nombre;
};

const onUpload = async (ev) => {
  try {
    const response = JSON.parse(ev.xhr?.response);
    if (response) {
      user.value.imagen = response.body;
      const updated = await store.dispatch("editarUsuario", {
        _id: user.value._id,
        imagen: response.body,
      });
      updated === true
        ? (toast.add({
            severity: "info",
            summary: "Muy bien!",
            detail: "La imagen ha sido actualizada satisfactoriamente!",
            life: 3000,
          }),
          emit("fetchUsers"))
        : null;
    }
  } catch (error) {}
};

const validateUserFields = () => {
  let errors = [];
  if (!user.value.usuario) errors.push("El usuario es requerido!");
  if (!user.value.contrasena) errors.push("La contraseña es requerida!");
  if (user.value.contrasena.length < 6)
    errors.push("La contraseña debe contener 6 carácteres como mínimo");
  if (user.value.contrasena != user.value.contrasena2)
    errors.push("Las contraseñas no coinciden!");
  if (!user.value.rol) errors.push("Debes elegir un rol!");
  for (const error of errors) {
    if (error != false) {
      toast.add({
        severity: "warn",
        summary: "Atención:",
        detail: error,
        life: 4500,
      });
    }
  }
  return errors.length == 0;
};

const saveForm = async () => {
  if (!props.userEdited && !validateUserFields()) return;
  let person = null;
  try {
    loading.value = true;

    if (getRoleName() != rolAdministrador.value) {
      // se guarda con persona
      if (persona.value?._id) {
        // editar persona
        person = {
          _id: persona.value?._id
        }
        await store.dispatch("editarEmpleado", { ...usuario.value });
      } else {
        // crear persona
        person = await store.dispatch("crearEmpleado", { ...usuario.value });
      }
    }

    if (props.userEdited) {
      await store.dispatch("editarUsuario", {
        ...user.value,
        rol: user.value.rol?._id ?? user.value.rol,
        persona: person?._id,
      });
    } else {
      await store.dispatch("crearUsuario", {
        ...user.value,
        rol: user.value.rol?._id ?? user.value.rol,
        persona: person,
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
