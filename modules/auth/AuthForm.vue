<template>
  

  <div class="w-full flex flex-col">
    <AppInputWithIcon v-model:value="user.email" icon="email" type="email" label="Email" placeholder="Insira seu email" />
    <AppInputWithIcon v-model:value="user.password" icon="key" type="password" label="Senha" placeholder="Insira sua senha" />
  </div>
</template>

<script>
import User from '@/entities/User'

export default {
  name: 'Auth',
  data() {
    return {
      user: new User()
    }
  }
}

</script>
