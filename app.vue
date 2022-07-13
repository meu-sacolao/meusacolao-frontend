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
    <Body id="body" class="w-screen h-screen font-sans bg-slate-100 text-zinc-700 overflow-x-hidden scrolling-touch relative">

      <AppPageHeader></AppPageHeader>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
      <AppFooter></AppFooter>

      <AppBaseDrawer></AppBaseDrawer>

    </Body>
  </Html>
</template>

<script setup lang="ts">
  import '@/assets/css/main.scss'

  definePageMeta({
    pageTransition: {
      mode: 'out-in'
    }
  })


</script>

<style lang="scss">
  .page-enter-from, .layout-enter-from {
    opacity: 0;
  }

  .page-enter-active,
  .page-leave-active,
  .layout-enter-active, 
  .layout-leave-active {
    transition: all 0.3s;
  }
  .page-enter,
  .page-leave-to,
  .layout-enter, 
  .layout-leave-active {
    opacity: 0;
    transform: translateX(-100px);
  }

</style>

