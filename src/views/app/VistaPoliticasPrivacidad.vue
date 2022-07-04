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
        <a href="./">
          <img
            :src="require('@/assets/logoC.png')"
            width="100%"
            class="bg-img1"
          />
        </a>
        <div class="cont2">
          <h1 contenido1>{{ "CoCo's" }}</h1>
          <h1 contenido2>{{ "BURGER" }}</h1>
        </div>
      </div>
      <div class="terminos-condiciones">
        <h2 contenido3>{{ "POLÍTICAS DE PRIVACIDAD" }}</h2>
      </div>
      <div class="cont4">
        <img
          :src="require('@/assets/avatarLogin.png')"
          width="100%"
          class="bg-img1"
        />
        <a href="../auth/VistaLogin" contenido2>{{ "INGRESAR" }}</a>
      </div>
    </template>
    <template #content>
      <div class="parrafo-content">
        <p class="parrafo-titulo">POLÍTICA DE PRIVACIDAD GENERAL</p>
        <p class="parrafo">
          Por medio del presente documento, DELOSI S.A. (en adelante, “DELOSI”)
          pone a disposición de los usuarios su Política de Privacidad, la cual
          se encuentra en armonía con la normativa vigente sobre protección de
          Datos Personales (Ley N° 29733 y Decreto Supremo 003-2013-JUS). A
          continuación, se señalan las finalidades de tratamiento de la
          información que usted nos ha suministrado, quiénes son los encargados
          de tratarla, el tiempo de almacenamiento en nuestras Bases de Datos,
          las medidas de seguridad, y los medios para ejercer sus derechos como
          titular de los Datos Personales.
        </p>
        <p class="parrafo1-1">1. ¿Qué información recopilamos?</p>
        <p class="parrafo1">
          Recolectamos la siguiente información personal: <br />
          1.1.Respecto de los datos personales de nuestros Clientes: nombre,
          apellidos, documento nacional de identidad, teléfono, correo
          electrónico, dirección y voz. <br />1.2. Respecto a los datos
          personales de nuestros Usuarios Web: nombre, apellidos, documento
          nacional de identidad, teléfono, correo electrónico y dirección.<br />
          1.3. Respecto de los datos personales de Postulantes: nombres,
          apellidos, documento nacional de identidad, pasaporte, carné de
          extranjería, firma, nacionalidad, sexo, edad, fecha de nacimiento,
          estado civil, profesión, dirección, teléfono, correo electrónico,
          imagen, datos académicos, datos de derechohabientes, experiencia
          laboral, e historial d créditos.<br /> 1.4. Respecto de los datos personales
          de Trabajadores: nombres, apellidos, documento nacional de identidad,
          pasaporte, carnet de extranjería, voz, firma, sexo, edad, fecha de
          nacimiento, estado civil, nacionalidad, profesión, dirección,
          teléfono, correo electrónico, datos académicos, datos de
          derechohabientes, datos de persona de contacto, experiencia laboral,
          datos bancarios, historial crediticio, información tributaria,
          seguros, planes de pensiones y jubilación, ingresos económicos,
          información relativa a la salud física y mental, huella dactilar y
          beneficios recibidos de programas sociales.
        </p>
      </div>
    </template>

    <template #footer>
      <div class="general1">
        <div class="contfooter1">
          <div class="interno">
            <div class="nt">
              <a href="./VistaNosotros" contenido1>{{ "Nosotros" }}</a>
              <a href="./VistaTerminos" contenido2
                >{{ "Terminos y condiciones" }} <br />
                {{ "de la web" }}</a
              >
            </div>
            <div class="nt">
              <a href="./VistaPoliticasDelivery" contenido1
                >{{ "Politicas de" }} <br />
                {{ "delivery" }}</a
              >
              <a href="./VistaPoliticasPrivacidad" contenido2
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

const store = useStore();
const currentRoute = computed(() => store.getters.getCurrentRouteActive);
</script>

<script>
export default {
  name: "VistaPoliticasPrivacidad",
};
</script>

<style lang="scss">
.terminos-condiciones {
  h2 {
    color: red;
    font-size: 30px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
}
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
          font-family: "Franklin Gothic Medium", "Arial Narrow", Arial,
            sans-serif;
          font-size: 25px;
          padding: 2px;
          text-decoration: none;
          color: #ffff;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
  .contfooter2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    h1 {
      font-weight: bold;
      font-family: Titan One;
      font-size: 40px;
      position: relative;
      //line-height: 1;

      color: white;
    }
    .iconos {
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
  object-fit: fill;
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
    text-decoration: none;
    color: #ffff;
    &:hover {
      color: red;
    }
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

.parrafo-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  p {
    letter-spacing: 1px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .parrafo-titulo {
    padding-top: 50px;
    text-decoration: underline;
    font-size: 20px;
  }
  .parrafo {
    padding: 40px 400px 30px 400px;
    text-align: justify;
  }
  .parrafo1 {
    padding: 0px 300px 30px 300px;
    text-align: justify;
  }
  .parrafo1-1{
    padding: 0px 300px 5px 300px;
    text-align: justify;
  }
}
</style>
