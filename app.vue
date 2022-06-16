<template>

  <Html lang="pt-br">
    <Head>
      <Title>Cálculo e Previdência</Title>
      <Meta name="description" content="Titulo" />
      <Meta charset="utf-8" />
      <Meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <Meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <Link rel="icon" href="/images/logo/128w/ICON_2_128w.png" />
    </Head>
    <Body>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    
      <AppBaseModal></AppBaseModal>
      <AppBaseDrawer></AppBaseDrawer>


      <div class="w-full flex flex-col space-y-6 p-8 bg-red-100">
        <AppButton bg="bg-slate-300 w-32" @click="emitter.emit('openDrawer', { component: 'RetirementOptionDetailDrawer', payload: { t: 'asdasd'} })">Abrir drawer</AppButton>
        <AppButton bg="bg-slate-300 w-32" @click="emitter.emit('openModal', { component: 'AuthForm' })">Abrir Modal</AppButton>
  
        <div class="w-full ">
          <pre>{{ authStore.loggedUser }}</pre>
        </div>
      </div>
    </Body>
  </Html>
</template>

<script setup lang="ts">
  import '@/assets/css/main.scss'
  import { useAuthStore } from "@/modules/auth/store"

  const authStore = useAuthStore()

  const { loggedUser } = authStore

</script>