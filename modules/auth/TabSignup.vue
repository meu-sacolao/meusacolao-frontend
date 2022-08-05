<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex flex-col space-y-2">
      <AppInputWithIcon 
        v-model:value="user.name" 
        icon="person" 
        type="text" 
        label="Nome" 
        placeholder="Insira seu nome"
        :hasError="tried && formErrors.includes('name')"
      >
        Preencha seu nome
      </AppInputWithIcon>
      <AppInputWithIcon 
        v-model:value="user.email" 
        icon="email" 
        type="email" 
        label="Email" 
        placeholder="Insira seu email"
        :hasError="tried && formErrors.includes('email')"
      >
        Preencha seu email
      </AppInputWithIcon>
      <AppInputWithIcon 
        v-model:value="user.phone" 
        icon="phone" 
        type="tel" 
        label="Telefone" 
        placeholder="Insira seu telefone"
        :mask="['(##)####-####', '(##)#####-####']"
        :hasError="tried && formErrors.includes('phone')"
      >
        Preencha seu telefone
      </AppInputWithIcon>
      <AppInputWithIcon 
        v-model:value="user.unencryptedPassword" 
        icon="key" 
        type="password" 
        label="Senha" 
        placeholder="Insira sua senha"
        @keydown.enter="signup()"
        :hasError="tried && formErrors.includes('unencryptedPassword')"
      >
        Preencha a senha
      </AppInputWithIcon>
    </div>
    <div class="w-full flex justify-end mt-8 block">
      <AppButton bg="bg-brand-gradient" text="text-white" @click="signup()">
        <span>Entrar</span>
        <AppIcons icon="chevron_right" />
      </AppButton>
    </div>
  </div>

</template>

<script setup>

  import { useAuthStore } from "@/modules/auth/store"
  import User from '@/entities/User'

  const { emit } = getCurrentInstance()
  defineEmits(['close', 'setTabSelected'])

  const authStore = useAuthStore()
  const user = ref(new User())
  const tried = ref(false)

  const formErrors = computed(() => {
    const errors = []
    if(user.value.name.length < 6) errors.push('name')
    if(user.value.phone.length < 10) errors.push('phone')
    if(user.value.email.length < 6) errors.push('email')
    if(user.value.unencryptedPassword.length < 6) errors.push('unencryptedPassword')
    return errors
  })

  const signup = () => {
    if(formErrors.value.length) {
      tried.value = true
      return
    }
    authStore.signup({ 
      name: user.value.name, 
      email: user.value.email, 
      phone: user.value.phone, 
      unencryptedPassword: user.value.unencryptedPassword, 
    })
      .then(() => {
        emit('close')
        alert('Cadastrado com sucesso')
      })
      .catch((err) => {
        if(err && err.response.status == 409) {
          alert('Você já possui cadastro, por favor realize o login')
          emit('setTabSelected', 'login')
        } else {
          alert('Erro ao cadastrar')
        }
      })
  }

</script>