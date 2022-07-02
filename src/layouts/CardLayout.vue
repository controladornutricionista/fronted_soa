<template>
  <v-card class="card__layout" outlined>
    <div
      :class="`card__header_anuncio ${
        collapsible ? 'card__header_anuncio--hover' : ''
      }`"
    >
      <slot name="header1">
        <h1>{{ contenido1 }}</h1>
        <h1>{{ contenido2 }}</h1>
      </slot>
    </div>
    <div
      :class="`card__header_bar ${
        collapsible ? 'card__header_bar--hover' : ''
      }`"
    >
      <slot name="header2">
        <h1>{{ contenido1 }}</h1>
        <h1>{{ contenido2 }}</h1>
      </slot>
    </div>

    <div
      :class="`card__content ${
        collapsible ? (showContent ? '' : 'card__content--no-show') : ''
      }`"
    >
      <slot name="content" />
    </div>

    <div
      :class="`card__footer_bar ${
        collapsible ? 'card__footer_bar--hover' : ''
      }`"
    >
      <slot name="footer">
        <h1>{{ contenido1 }}</h1>
        <h1>{{ contenido2 }}</h1>
      </slot>
    </div>
  </v-card>
</template>

<script setup>
const { ref } = require("@vue/reactivity");

const props = defineProps({
  contenido1: {
    type: String,
    default: "",
  },
  contenido2: {
    type: String,
    default: "",
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
});

//variables
const showContent = ref(false);

//methods
const toggleCollapse = () => {
  showContent.value = !showContent.value;
};
</script>

<style lang="scss">
.card__layout {
  --padding-x: 80px;
  border-radius: var(--border-radius-sm) !important;
  box-shadow: var(--box-shadow) !important;
  margin-top: calc(var(--header-height) / 2);
  position: relative;
  // overflow: hidden;

  @media screen and (max-width: 400px) {
    --padding-x: 18px;
  }

  &.min--padd {
    .card__content {
      padding: 10px 18px !important;
    }
  }
  &.no--padd {
    & > .card__header_bar {
      padding: 0 !important;
      .v-slide-group-item--active {
        background: var(--color-primary-500);
      }
    }
  }
  &_bg {
    .card__header_bar {
      background: var(--color-primary-400) !important;
    }
  }
  &_dark {
    & > .card__header_bar {
      background: var(--color-fondo-tab) !important;
    }
  }
  .card__footer_bar{
    margin-top: 0px;
    height: 500px;
    padding: 12px var(--padding-x);
    color: var(--color-white);
    background: #173083;
    display: inline-flex; 
    display: flex;
   
    flex-direction: column;
    padding-top: 20px;
  }
  .card__header_anuncio {
    padding: 12px var(--padding-x);
    color: var(--color-white);
    background: rgba(0, 0, 0);
    display: inline-flex;
    display: flex;
   
    gap: 50px;
    justify-content: center;
  }
  .card__header_bar {
    padding: 5px var(--padding-x);
    --padding-x: 200px;
    // color: var(--color-text-gray-bold);
    color: var(--color-white);
    top: calc(var(--header-height) / -2);
    left: var(--padding-x);
    border-radius: var(--border-radius-sm);
    min-width: 200px;
    display: inline-flex;
    background: #173083;
    display: flex;
    transition: all ease-in-out 0.15s;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    &--hover:hover {
      background: var(--color-primary-500);
      cursor: pointer;
    }

    .v-slide-group {
      button {
        height: 100% !important;
      }
    }

    h1 {
      // text-transform: uppercase;
      font-size: clamp(var(--font-size-lg), 5vw, var(--font-size-xl));
      font-weight: 600;
    }
  }
  .card__content {
    padding: calc(var(--header-height) / 2) var(--padding-x) !important;

    &--no-show {
      display: none;
    }
    transition: height 0.35s ease;
  }
}
</style>
