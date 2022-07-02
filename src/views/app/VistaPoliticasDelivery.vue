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
        <h2 contenido3>{{ "POLITICAS DE DELIVERY Y ATENCIÓN PARA LLEVAR" }}</h2>
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
      <div class="parrafo-content">
        <p class="parrafo">
          Estimado Cliente, a continuación te presentamos los Términos y
          Condiciones de nuestra Política de reparto a domicilio, restaurantes y
          atención para llevar. Te recomendamos que la revises cuando realices
          tus pedidos por estos canales. Te comunicamos que como empresa estamos
          cumpliendo con todos los protocolos de seguridad sanitaria respecto a
          la preparación, empaque y entrega de los productos.
        </p>
        <p>
          Los horarios de atención para restaurantes en Lima y provincias son
          los siguientes:
        </p>
        <p>DELIVERY: 11:00 AM – 11:00 PM</p>
        <p>RECOJO EN RESTAURANTE: 11:00 AM – 11:00 PM</p>
        <p>SALÓN: 11:00AM – 11:00PM</p>
        <p>AUTORÁPIDO: 11:00AM – 11:30 PM</p>
        <p class="parrafo">
          *Aplican restricciones Para recoger en restaurante, el pago de la
          orden se realizará contra entrega en el restaurante mediante las
          modalidades de pago en efectivo o con tarjeta. El pedido debe ser
          recogido en tienda en un tiempo aproximado de 20-30 minutos de haber
          realizado la solicitud. No se aceptan billetes mayores de $50.00 como
          forma de pago. Por cada combo y/o mega se cobrará S/ 0.30 por bolsa
          compostable. Una vez confirmada la tienda donde se recogerá el pedido,
          no se aceptarán cambios de tienda o productos. Todos los clientes que
          se acerquen a recoger sus pedidos deberán seguir las siguientes
          medidas de seguridad: Portar mascarilla al momento de recoger su
          pedido conforme a las normas exigidas por el Gobierno Respetar el
          distanciamiento social mínimo de 1.5 m entre clientes al momento de
          hacer la cola para el recojo del pedido. La empresa no brindará
          atención a los clientes que no cumplan con las medidas preventivas
          antes indicadas. Se recomienda al cliente que al recibir su pedido
          pueda desinfectar el empaque, para posteriormente desecharlo, y
          efectuar el lavado de manos correspondiente.
        </p>
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

const store = useStore();
const currentRoute = computed(() => store.getters.getCurrentRouteActive);
</script>

<script>
export default {
  name: "VistaPrincipal",
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
  }
}
</style>
