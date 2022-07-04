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
      <div class="centro-header">
        <h2 contenido3>{{ "NOSOTROS" }}</h2>
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
      <div class="wrapper__init">
        <div class="header-contenido">
          <p1>¿Cómo nació CoCo's BURGER?</p1>
        </div>
        <hr class="h" />
        <div class="main-contenido">
          <div class="main-imagen">
            <img :src="require('@/assets/coco.jpg')" class="bg-img" />
          </div>
          <div class="parrafos">
            <p class="parrafointerno">
              En 1988 un par de jóvenes empresarios peruanos decidió incursionar
              en un mercado poco difundido hasta el momento en el Perú: el
              mercado de las hamburguesas. En ese momento existían cadenas
              nacionales que ofrecían hamburguesas dentro de su menú, pero no se
              había desarrollado el hábito de consumo de hamburguesa en el
              público peruano ni habían llegado al país las grandes cadenas
              internacionales. Estos jóvenes empresarios no conocían el negocio
              pero les gustaban las hamburguesas y tenían muchas ganas y
              convicción en sacar adelante su proyecto. Es así que el 11 de
              Junio de 1988 nació CocosBurger en un local alquilado del corazón
              de Miraflores y comenzaron a trabajar en su objetivo de preparar
              la mejor hamburguesa del Perú. El éxito fue inmediato, pues además
              del excelente producto CocosBurger contaba con un ambiente
              divertido, una moderna decoración y un excelente servicio. Debido
              a esta gran acogida, en 1990 se inaugura también con éxito sin
              precedentes el segundo local de CocosBurger en San Isidro, de allí
              en adelante el crecimiento sería constante. Cuando las grandes
              cadenas internacionales de hamburguesas llegaron al Perú
              CocosBurger ya estaba posicionada en el mercado y la competencia
              los motivó a ser más innovadores y eficientes, logrando mantener
              el liderazgo en el mercado.
            </p>
          </div>
        </div>
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
              width="50%"
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
</script>

<script>
export default {
  name: "VistaNosotros",
};
</script>

<style lang="scss">
.main-contenido {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  padding-bottom: 0px;
  .main-imagen {
    width: 50%;
    align-items: center;
    align-content: center;
    text-align: center;
    img {
      margin: 0px auto;
      width: 60%;
      padding: 30px;
    }
  }
  .parrafos {
    width: 50%;
    align-items: center;
    align-content: center;
    text-align: center;
    .parrafointerno {
      margin: 0px auto;
      padding-right: 100px;
    }
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
  width: 50%;
  height: calc(100vh - 500px);
  border-radius: 800px;
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
  margin-bottom: -30px;

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
.centro-header h2 {
  color: red;
  font-size: 40px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.header-contenido{
  padding-left: 50px;
}
</style>
