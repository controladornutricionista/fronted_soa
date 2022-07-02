<template>
  <div class="card__patient" v-if="patient">
    <div class="d-flex">
      <img
        v-if="fullCard"
        draggable="false"
        height="100"
        class="mx-auto"
        :src="loadImage(user?.imagen?.src ?? imageSrc)"
        alt=""
      />
    </div>
    <h4 class="name">{{ patient.apellidos }} {{ patient.nombres }}</h4>
    <div class="d-flex flex-nowrap align-items-center">
      <span class="height">{{ patient.estatura }} cm</span>
      <span class="weight">{{ patient.peso }} kg</span>
      <span class="imc">IMC: {{ calculateIMC(patient.peso, patient.estatura) }}</span>
    </div>
  </div>
</template>

<script setup>
import { loadImage } from "@/libs/loadImage";
import { calculateIMC } from "@/libs/med"
defineProps({
  user: {
    type: Object,
    default: null,
  },
  patient: {
    type: Object,
    default: null,
  },
  imageSrc: {
    type: String,
    default: "",
  },
  fullCard: Boolean,
});
</script>

<style lang="scss">
.card__patient {
  .name {
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .height,
  .weight,
  .imc {
    font-size: 12px;
    padding: 2px 6px;
    display: inline-block;
    border-radius: 4px;
    background: #ccc;
    margin-right: 3px;
    white-space: nowrap;
  }
}
</style>
