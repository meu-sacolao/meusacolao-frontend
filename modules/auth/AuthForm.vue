<template>
  

  <div class="w-full flex flex-col space-y-4">
    <AppInputWithIcon v-model:value="user.email" icon="email" type="email" label="Email" placeholder="Insira seu email" />
    <AppInputWithIcon v-model:value="user.password" icon="key" type="password" label="Senha" placeholder="Insira sua senha" />

    <AppButton @click="authStore.login({ email: user.email, password: user.password })">
      Entrar
    </AppButton>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/modules/auth/store"
import User from '@/entities/User'

const authStore = useAuthStore()

const user = ref(new User())

</script>
