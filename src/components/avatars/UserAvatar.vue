<template>
  <v-avatar
    class="avatar"
    color="#fff"
    :size="size"
  >
    <v-img
      :src="$store.getters.getUserAvatar"
      draggable="false"
      alt="John"
    />
  </v-avatar>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "x-small",
  },
});


</script>

<style lang="scss">
.avatar {
  &__image {
    width: 100%;
    height: 100%;
    fill: var(--color-primary-300);
  }
}
</style>
