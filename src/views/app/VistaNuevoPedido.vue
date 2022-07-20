<template>
  <CardLayout :nomostrarfooter="true">
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
        <a href="#">
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
        <h2 contenido3>{{ "MENU - PROMOCIONES" }}</h2>
      </div>
    </template>
    <template #content>
      <div class="wrapper__init">
        <div class="main-contenido">
          <div class="main-imagen1">
            <div class="imagen1">
              <img
                :src="require('@/assets/Hamburguesa-Suprema.jpg')"
                class="bg-imgmenu"
              />
              <div class="tiposH">
                <div class="menupromocional1">
                  <label for="activeAlimento1" class="mr-2"
                    >Hamburguesa Suprema
                  </label>
                  <Checkbox
                    id="activeAlimento1"
                    value="1"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('1'), '1')"
                  />
                </div>
                <div class="menupromocional1">
                  <label for="activeAlimento2" class="mr-2">
                    Hamburguesa Kid
                  </label>
                  <Checkbox
                    id="activeAlimento2"
                    value="2"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('2'), '2')"
                  />
                </div>
                <div class="menupromocional1">
                  <label for="activeAlimento3" class="mr-2"
                    >Hamburguesa MCRonal</label
                  >
                  <Checkbox
                    id="activeAlimento3"
                    value="3"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('3'), '3')"
                  />
                </div>
              </div>
            </div>
            <div class="imagen1">
              <img
                :src="require('@/assets/Salchipapa-mortal.jpg')"
                class="bg-imgmenu"
              />
              <div class="tiposH">
                <div class="menupromocional1">
                  <label for="activeAlimento4" class="mr-2"
                    >Salchipapa Frank
                  </label>
                  <Checkbox
                    id="activeAlimento4"
                    value="5"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('5'), '5')"
                  />
                </div>
                <div class="menupromocional1">
                  <label for="activeAlimento5" class="mr-2"
                    >Salchipapa Mortal</label
                  >
                  <Checkbox
                    id="activeAlimento5"
                     value="6"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('6'), '6')"
                  />
                </div>
                <div class="menupromocional1">
                  <label for="activeAlimento6" class="mr-2">
                    Salchipapa Tradicional
                  </label>
                  <Checkbox
                    id="activeAlimento6"
                     value="4"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('4'), '4')"
                  />
                </div>
              </div>
            </div>


            <div class="imagen1">
              <img
                :src="require('@/assets/Broaster-Pierna.jpg')"
                class="bg-imgmenu"
              />
              <div class="tiposH">
                <div class="menupromocional1">
                  <label for="activeAlimento7" class="mr-2"
                    >Broaster Alita
                  </label>
                  <Checkbox
                    id="activeAlimento7"
                     value="9"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('9'), '9')"
                  />
                </div>
                <div class="menupromocional1">
                  <label for="activeAlimento8" class="mr-2"
                    >Broaster Pecho</label
                  >
                  <Checkbox
                    id="activeAlimento8"
                    value="7"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('7'), '7')"
                  />
                </div>
                <div class="menupromocional1">
                  <label for="activeAlimento9" class="mr-2">
                    Broaster Pierna
                  </label>
                  <Checkbox
                    id="activeAlimento9"
                    value="8"
                    v-model="checkboxes"
                    @change="onCheckChange(checkboxes.includes('8'), '8')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SidebarMenu ref="menu">
        <template #content>
          <FormPedidoVue :menu="menuSeleceted" @closeForm="closeForm">
          </FormPedidoVue>
        </template>
      </SidebarMenu>
    </template>
  </CardLayout>
</template>

<script setup>
import CardLayout from "@/layouts/CardLayout.vue";
import Checkbox from "primevue/checkbox";
import SidebarMenu from "@/components/SidebarMenu.vue";
import FormPedidoVue from "@/components/forms/FormPedido.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const checkboxes = ref([]);

const menu = ref();
const menuList = computed(() => store.getters.getMenus);
const menuSeleceted = ref();

const closeForm = () => {
  menu.value.close();
};

const onCheckChange = (value, id) => {
  console.log("cambió", value, id);
  if (value) {
    checkboxes.value = [];
    checkboxes.value.push(id);
    const menuFounded = menuList.value.find((menu) => menu.id == id);
    menuSeleceted.value = menuFounded;
    console.log(menuFounded);
    menu.value.open();
  }
};
</script>

<script>
export default {
  name: "NuevoPedidoPage",
};
</script>

<style lang="scss">
.main-contenido {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 0px;
  .main-imagen1 {
    display: flex;
    padding-top: 50px;
    .imagen1 {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tiposH {
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        padding-bottom: 30px;
        .menupromocional1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      .bg-imgmenu {
        width: 80%;
        height: calc(100vh - 500px);
        border-radius: 800px;
      }
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

.header-contenido {
  padding-left: 50px;
}
</style>
