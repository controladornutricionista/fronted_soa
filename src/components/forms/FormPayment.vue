<template>
  <div class="w-96 mx-auto border border-gray-400 rounded-lg form__payment">
    <div class="w-full h-auto p-4 flex items-center border-b border-gray-400">
      <h2 class="w-full">Tarjeta de Débito</h2>
      <a href="#" class="w-full text-right text-sm font-semibold text-indigo-700"
        >Otros medios de pago</a
      >
    </div>
    <div class="w-full h-auto p-4">
      <form @submit.prevent="pagar">
        <div
          class="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500"
        >
          <label
            for="cc-name"
            class="text-xs tracking-wide uppercase font-semibold"
            >Nombre de la tarjeta</label
          >
          <input
            id="cc-name"
            type="text"
            name="cc-name"
            class="w-full h-8 focus:outline-none"
            placeholder="e.g. John E Cash"
            required
            minlength="4"
          />
        </div>

        <div
          class="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500"
        >
          <label
            for="cc-number"
            class="text-xs tracking-wide uppercase font-semibold"
            >Número de la tarjeta</label
          >
          <input
            id="cc-number"
            type="text"
            name="cc-number"
            v-model="creditNumber"
            class="w-full h-8 focus:outline-none"
            placeholder="16-digit card number"
            required
            minlength="16"
            maxlength="16"
          />
        </div>

        <div
          class="flex mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:border-gray-500"
        >
          <div class="w-full focus-within:text-gray-900">
            <label for="" class="text-xs tracking-wide uppercase font-semibold"
              >Fecha expiración</label
            >
            <input
              id="cc-expiry"
              type="text"
              class="w-full h-8 focus:outline-none"
              placeholder="MM / YYYY"
              required
            />
          </div>

          <div class="w-auto focus-within:text-gray-900">
            <label for="" class="text-xs tracking-wide uppercase font-semibold"
              >CVV</label
            >
            <input
              id="cc-cvv"
              type="text"
              placeholder="555"
              class="w-full h-8 focus:outline-none"
              minlength="3"
              maxlength="3"
              required
            />
          </div>
        </div>

        <button
          :disabled="loading"
          class="h-16 w-full rounded-sm bg-indigo-600 tracking-wide font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
        >
          <span v-if="!loading">
            S/ {{ total }}.00 PAGAR
          </span>
          <span v-else>Pagando...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const emit = defineEmits(["paymentSuccess"])
defineProps({
  total: {
    type: Number,
    default: 1
  }
})

const loading = ref(false)
const creditNumber = ref("")

const pagar = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    emit('paymentSuccess', creditNumber.value)
  }, 2500);
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600&display=swap");

.form__payment {
  font-family: "Libre Franklin", Verdana, sans-serif;
  color: #697280;
}
</style>
