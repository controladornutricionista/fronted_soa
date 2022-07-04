<template>
  <div class="login__wrapper">
    <div class="login__container">
      <div class="card__login">
        <div class="column__images">
          <img draggable="false" :src="formLogin.image" alt="" />
        </div>
        <div class="column__form">
          <form @submit.prevent="signIn">
            <a href="/">
              <img :src="logo" width="100" alt="" />
            </a>
            <div class="login-texto">
              <h2>{{ formLogin.title }}</h2>
              <p>{{ formLogin.subtitle }}</p>
            </div>

            <v-row>
              <v-col cols="12" lg="12" sm="12">
                <v-text-field
                  v-model="user.username"
                  class="input__search_doi"
                  :variant="inputStyle.variant"
                  :bg-color="inputStyle.background"
                  :color="inputStyle.color"
                  :label="formLogin.usuario.label"
                  :type="formLogin.usuario.type"
                  :rules="[validateMinMaxUsername]"
                  :hide-details="true"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" sm="12">
                <v-text-field
                  v-model="user.password"
                  class="input__search_doi"
                  :variant="inputStyle.variant"
                  :bg-color="inputStyle.background"
                  :color="inputStyle.color"
                  :label="formLogin.password.label"
                  :type="formLogin.password.type"
                  :rules="[validateMinMaxPassword]"
                  :hide-details="true"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" sm="12">
                <TextButton
                  :label="formLogin.button.label"
                  type="submit"
                  class="w-100 d-flex justify-content-center rounded2"
                  :loading="loading"
                  :disabled="loading"
                /><br />
                <TextButton
                  :label="formLogin.button2.label"
                  type="submit"
                  class="w-100 d-flex justify-content-center otro-color rounded2"
                  :loading="loading"
                  :disabled="loading"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <copy-right
                  class="copyright_dark copyright_center copy__position"
                />
              </v-col>
            </v-row>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CopyRight from "@/components/CopyRight.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  components: { CopyRight, TextButton },
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = ref({ username: "", password: "" });
    const loading = ref(false);

    const formLogin = computed(
      () => store.getters.dataBase?.forms?.login ?? {}
    );
    const inputStyle = computed(
      () => store.getters.dataBase?.forms?.inputStyle ?? {}
    );
    const logo = computed(
      () => store.getters.dataBase?.application?.logo ?? ""
    );

    const validateMinMaxUsername = (str) => {
      const { min, max } = formLogin.value.usuario;
      const text = String(str).trim();
      if (text.length >= min && text.length <= max) return true;
      return "Completa correctamente los campos del formulario";
    };

    const validateMinMaxPassword = (str) => {
      const { min, max } = formLogin.value.password;
      const text = String(str).trim();
      if (text.length >= min && text.length <= max) return true;
      return "Completa correctamente los campos del formulario";
    };

    const signIn = async () => {
      const validateUsername = validateMinMaxUsername(user.value.username);
      const validatePassword = validateMinMaxPassword(user.value.password);

      if (validateUsername !== true) {
        store.dispatch("activeSnackbar", {
          type: "warning",
          active: true,
          message: validateUsername,
          position: "bottom-center",
        });
        return;
      }
      if (validatePassword !== true) {
        store.dispatch("activeSnackbar", {
          type: "warning",
          active: true,
          message: validatePassword,
          position: "bottom-center",
        });
        return;
      }
      if(!/.+@.+\..+/.test(user.value.username)) {
        store.dispatch("activeSnackbar", {
          type: "warning",
          active: true,
          message: "Escribe un correo válido con @ y dominio",
          position: "bottom-center"
        })
        return
      }

      loading.value = true;

      const response = await store.dispatch("login", {
        usuario: user.value.username,
        contrasena: user.value.password,
      });

      loading.value = false;
      if (!response) return;

      router.push({ name: "Home" });
    };

    return {
      user,
      loading,
      formLogin,
      inputStyle,
      logo,
      validateMinMaxUsername,
      validateMinMaxPassword,
      signIn,
    };
  },
};
</script>

<style lang="scss">
.login-texto {
  text-align: center;
  h2 {
  }
  p {
    font-weight: bold;
  }
}

.login__wrapper {
  height: 100vh;
  background: var(--color-fondo-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  .btn__login {
    display: flex;
    justify-content: center;
  }
  p {
    color: var(--color-text-gray-bold);
    margin-bottom: 18px;
  }
  .custom__button {
    background: #173083;
    color: var(--color-white);
  }
  .otro-color {
    background: #fbb905;
  }
  .rounded2 {
    border-radius: 30px !important;
  }
  .card__login {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1200px;
    max-height: 600px;
    height: calc(100vh - 100px);
    background: var(--color-white);
    border-radius: 8px;
    overflow: hidden;
    @media screen and (max-width: 1500px) {
      max-width: 1050px;
    }

    @media screen and (max-width: 1200px) {
      max-width: 85%;
      margin: 0 auto;
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
      min-width: 500px;
      max-width: 80%;
    }
    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      min-width: 90%;
      max-width: 80%;
    }
    form {
      min-width: 70%;
      max-width: 500px;
    }
  }
  .column__form {
    padding: 2rem 2rem 50px 2rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    position: relative;
  }
  .column__images {
    @media screen and (max-width: 800px) {
      display: none;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right;
    }
  }
  .copy__position {
    position: absolute;
    width: 100%;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 30px;
  }
}
</style>
