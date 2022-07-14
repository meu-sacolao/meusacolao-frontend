<template>
  <NuxtLink
    :to="redirectUrl"
    class="block mb-4"
  >
    <AppButton
      class="border flex w-full p-6 hover:shadow" 
      :disabled="redirectUrl == ''"
    >
      <span class="mr-4">Acessar com Google</span>
      <AppIcons icon="images/general/logo_google.svg" />
    </AppButton>
  </NuxtLink>
</template>

<script setup>
  import Api from '@/util/Api'
  const redirectUrl = ref('')

  onMounted(() => {
    getRedirectUrl()
  })

  const getRedirectUrl = () => {
    Api.get(`/auth/getGoogleAuthUrl`)
      .then(({ data }) => {
        redirectUrl.value = data.googleRedirectUrl
      })
  }

</script>