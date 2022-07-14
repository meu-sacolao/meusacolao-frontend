<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex flex-col space-y-4">
      <AppInputWithIcon 
        v-model:value="user.email" 
        icon="person" 
        type="text" 
        label="Nome" 
        placeholder="Insira seu npme" 
      />
      <AppInputWithIcon 
        v-model:value="user.email" 
        icon="email" 
        type="email" 
        label="Email" 
        placeholder="Insira seu email" 
      />
      <AppInputWithIcon 
        v-model:value="user.phone" 
        icon="phone" 
        type="tel" 
        label="Telefone" 
        placeholder="Insira seu telefone"
        :mask="['(##)####-####', '(##)#####-####']" 
      />
      <AppInputWithIcon 
        v-model:value="user.password" 
        icon="key" 
        type="password" 
        label="Senha" 
        placeholder="Insira sua senha"
        @keydown.enter="login()"
      />
    </div>
    <div class="w-full flex justify-end mt-8 block">
      <AppButton bg="bg-brand-gradient" text="text-white" @click="login()">
        <span>Entrar</span>
        <AppIcons icon="chevron_right" />
      </AppButton>
    </div>
  </div>

</template>

<script setup>

  import { useAuthStore } from "@/modules/auth/store"
  import User from '@/entities/User'

  const authStore = useAuthStore()
  const user = ref(new User())

  const login = () => {
    authStore.login({ email: user.value.email, password: user.value.password })
      .then(() => {
        emit('close')
        alert('Logado com sucesso')
      })
      .catch(() => {
        alert('Erro ao logar')
      })
  }

</script>