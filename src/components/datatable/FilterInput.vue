<template>
  <input
    ref="inputText"
    v-model="text"
    class="p-inputtext p-component p-column-filter p-column-filter filter__menu_input"
    :placeholder="placeholder"
    :type="type"
    @keyup="onKeyUp"
  >
</template>

<script setup>
import { onMounted, ref } from "vue";

const emit = defineEmits(["updateText", "submitFilter"]);
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  }
});

const inputText = ref();
const text = ref(props.value);
const timeOutDebounce = ref(null);

const onKeyUp = (ev) => {
  if (timeOutDebounce.value) {
    clearTimeout(timeOutDebounce.value);
  }
  timeOutDebounce.value = setTimeout(() => {
    emit("updateText", text.value);
  }, 100);
};

const submitFilter = () => {
  emit('submitFilter')
}

onMounted(() => {
  inputText.value.focus();
});
</script>

<style></style>
