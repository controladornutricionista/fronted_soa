<template>
  <v-menu
    min-width="200px"
    :offset-x="true"
    left="true"
    anchor="start"
  >
    <template #activator="{ props }">
      <v-btn
        text
        v-bind="props"
        depressed
        class="elevation-0"
      >
        <UserAvatar size="x-small" />
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <UserAvatar size="x-small" />
          <h3>{{ userFullname }}</h3>
          <p class="text-caption mt-1">
            {{ userCode }}
          </p>
          <v-divider class="my-3" />
          <v-btn
            rounded
            variant="text"
          >
            Mi perfil
          </v-btn>
          <v-divider class="my-3" />
          <v-btn
            rounded
            variant="text"
            @click="$store.dispatch('logout')"
          >
            Salir
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script setup>
import UserAvatar from '@/components/avatars/UserAvatar.vue'
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const user = computed(() => store.getters.getCurrentUser)
const userCode = computed(() => store.getters.getUserId)
const userFullname = computed(() => store.getters.getUserFullname)

</script>
<script>
export default {
  name: "AuthMenu",
};
</script>

<style lang="scss">
.auth-menu {
  &__avatar {
    width: 100%;
    height: 100%;
    fill: var(--color-primary-300);
  }
}
</style>
