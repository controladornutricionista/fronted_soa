<template>
  <button
    class="button__back"
    @click.stop="$emit('click.stop')"
    @click="$emit('click')"
  >
    <svg
      width="20"
      height="20"
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
    ><path
      d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"
      fill-rule="nonzero"
    /></svg>
  </button>
</template>

<script setup>
defineEmits(["click", "click.stop"])
</script>

<style lang="scss">
.button__back {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--color-white);
  }
}
</style>