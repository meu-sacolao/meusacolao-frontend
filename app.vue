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

      <div id="main-content" class="w-screen h-screen font-sans bg-slate-100 text-zinc-700 overflow-x-hidden scrolling-touch" style="-webkit-overflow-scrolling: touch;">
        <div class="min-h-container w-full mt-24 p-12 px-6 md:px-20 xl:px-28 overflow-y-auto overflow-x-hidden scrolling-touch">
          <AppPageHeader></AppPageHeader>
          <NuxtLayout>
            <NuxtPage/>
          </NuxtLayout>
        </div>
        <AppFooter></AppFooter>
      </div>

      <AppBaseModal></AppBaseModal>
      <AppBaseDrawer></AppBaseDrawer>

    </Body>
  </Html>
</template>

<script setup lang="ts">
  import '@/assets/css/main.scss'
</script>

<style lang="scss">
  .min-h-container {
    min-height: calc(100vh - 96px);
  }
</style>

