<template>
  

  <div class="w-full flex flex-col space-y-4">
    <AppInputWithIcon v-model:value="user.email" icon="email" type="email" label="Email" placeholder="Insira seu email" />
    <AppInputWithIcon v-model:value="user.password" icon="key" type="password" label="Senha" placeholder="Insira sua senha" />

    <AppButton @click="login()">
      Entrar
    </AppButton>
  </div>
</template>

<script setup>
  import { getCurrentInstance } from 'vue'
  import { useAuthStore } from "@/modules/auth/store"
  import User from '@/entities/User'

  const authStore = useAuthStore()
  const { emit } = getCurrentInstance()
  defineEmits(['close'])

  const user = ref(new User())

  const login = () => {
    authStore.login({ email: user.value.email, password: user.value.password })
      .then(() => {
        emit('close')
      })
      .catch(() => {
        alert('Erro ao logar')
      })
  }

</script>
