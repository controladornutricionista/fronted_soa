<template>
  <CardLayout>
    <template #header1>
      <div class="cont1">
        <h1 contenido1>{{ "Atención" }}</h1>
        <h1 contenido2>{{ "en Lima" }}</h1>
      </div>
      <div class="line"></div>
      <div class="cont2">
        <h1 contenido1>{{ "Delivery: Hasta las 11pm*" }}</h1>
        <h1 contenido2>{{ "Recojo en tienda: Hasta las 9pm*" }}</h1>
      </div>
    </template>

    <template #header2>
      <div class="cont3">
        <img
          :src="require('@/assets/logoC.png')"
          width="100%"
          class="bg-img1"
        />
        <div class="cont2">
          <h1 href="./VistaPrincipal.vue" contenido1>{{ "CoCo's" }}</h1>
          <h1 contenido2>{{ "BURGER" }}</h1>
        </div>
      </div>
      <div class="cont4">
        <img
          :src="require('@/assets/avatarLogin.png')"
          width="100%"
          class="bg-img1"
        />
        <a href="./VistaLogin.vue" contenido2>{{ "INGRESAR" }}</a>
      </div>
    </template>
    <template #content>
      <div class="wrapper__init">
        <img
          :src="require('@/assets/ImagenPrincipal.jpg')"
          width="100%"
          height="100%"
          class="bg-img"
        />
      </div>
    </template>

    <template #footer>
      <div class="general1">
        <div class="contfooter1">
          <div class="interno">
            <div class="nt">
              <a href="./VistaNosotros.vue" contenido1>{{ "Nosotros" }}</a>
              <a href="./VistaTerminos.vue" contenido2
                >{{ "Terminos y condiciones" }} <br />
                {{ "de la web" }}</a
              >
            </div>
            <div class="nt">
              <a href="./VistaPoliticasDelivery.vue" contenido1
                >{{ "Politicas de" }} <br />
                {{ "delivery" }}</a
              >
              <a href="./VistaPoliticasPrivacidad.vue" contenido2
                >{{ "Politicas de" }} <br />
                {{ "privacidad" }}</a
              >
            </div>
          </div>

          <div class="logofooter">
            <img
              :src="require('@/assets/logoC.png')"
              width="100%"
              class="bg-img1"
            />
            <h3 contenido1>{{ "CoCo's BURGER" }}</h3>
          </div>
        </div>

        <div class="contfooter2">
          <div class="textoiconos">
            <h1 contenido1>{{ "Siguenos" }}</h1>
          </div>
          <div class="iconos">
            <img
              :src="require('@/assets/facebook.png')"
              width="100%"
              class="bg-img1"
            />
            <img
              :src="require('@/assets/youtube.png')"
              width="100%"
              class="bg-img1"
            />
            <img
              :src="require('@/assets/instagram.png')"
              width="100%"
              class="bg-img1"
            />
          </div>
        </div>
      </div>

      <div class="general2">
        <hr class="h" />
        <div class="general2-1">
          <h3 contenido2>{{ "2022 Todos los derechos reservados" }}</h3>
        </div>
      </div>
    </template>
  </CardLayout>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

import CardLayout from "@/layouts/CardLayout.vue";
import DataTable from "@/components/datatable/Datatable.vue";

const store = useStore();
const currentRoute = computed(() => store.getters.getCurrentRouteActive);
</script>

<script>
export default {
  name: "VistaPrincipal",
};
</script>

<style lang="scss">
.logofooter {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  gap: 40px;
  h3 {
    font-weight: bold;
    font-family: Titan One;
    font-size: 25px;
    padding: 10px;
  }
}
.general1 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .contfooter1 {
    display: flex;
    flex-direction: column;
    align-items: center;

    .interno {
      display: flex;
      gap: 150px;
      align-items: center;
      .nt {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        a {
          font-weight: bold;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          font-size: 25px;
          padding: 2px;
          text-decoration: none;
          color: #ffff;
        }
      }
    }
  }
  .contfooter2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    h1{
    font-weight: bold;
    font-family: Titan One;
    font-size: 40px;
    position: relative;
    //line-height: 1;
    
    color: white;
    }
    .iconos{
      display: flex;
      align-items: center;
      gap: 30px;
    }
  }
}
.general2 {
  .general2-1 {
    text-align: center;
  }
}
.bg-img {
  width: 100%;
  height: 476px;
  object-fit:fill;
  height: calc(100vh - 500px);
}

.bg-img1 {
  width: 80px;
  height: auto;
}

.line {
  border-left: 5px solid white;
  position: relative;
  margin-left: -4px;
}
.cont3 {
  display: flex;
  align-self: center;
  .cont2 {
    padding-left: 60px;
    align-content: center;
    align-items: center;
  }

  .cont2 h1 {
    font-weight: bold;
    font-family: Titan One;
    font-size: 30px;
  }
}

.cont4 {
  display: flex;
  align-items: center;
  a {
    margin-left: 30px;
    font-size: 25px;
  }
  img {
    width: 50px;
  }
}
h1 {
  font-weight: bold;
  font-family: Titan One;
  font-size: 40px;
  position: relative;
  left: 50%;
  top: 20%;
  line-height: 1;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: white;
  span {
    font-weight: bold;
    font-size: clamp(35px, 5vw, 50px);
    color: var(--color-primary-400) !important;
  }
}

.wrapper__init {
  position: relative;
  margin-bottom: 0px;
  padding-bottom: 0px;
  margin-bottom: -7px;

  &::after {
    content: "";
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
}

.h {
  width: 100%;
  height: 4px;
  border: 0 none;
  background-color: black;
}
</style>
