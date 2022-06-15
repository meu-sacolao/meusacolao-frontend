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

      <AppModal></AppModal>


      <div class="w-full bg-red-100">
        <pre>{{ authStore.loggedUser }}</pre>
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