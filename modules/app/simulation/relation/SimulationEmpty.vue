<template>
  <div class="w-full flex flex-wrap p-8 shadow-md bg-cyan-800/5">
    <div class="w-full lg:w-1/3 p-6 flex flex-col justify-center items-start space-y-6">
      <p class="leading-relaxed text-lg">Adicione vínculos e contribuições previdênciarias para calcular o resultado de sua aposentadoria</p>
      <AppButton 
        bg="bg-brand-gradient text-white text-sm px-2 py-1"
        @click="openRelationEditModal()"
      >
        <AppIcons icon="add_box" />
        <span class="ml-2">Adicionar novo vínculo</span>
      </AppButton>
    </div>
    <div class="w-full lg:w-2/3 flex flex-wrap items-center justify-center">
      <img class="w-full w-1/2 lg:w-3/4" src="/images/general/pack-illustrations/10.svg" />
    </div>
    
  </div>
</template>

<script setup>

  import SocialSecurityRelation from '@/entities/SocialSecurityRelation'
  import emitter from '@/util/emitter'
  const route = useRoute()

  const openRelationEditModal = () => {
    emitter.emit('openRelationEditModal', { socialSecurityRelation: new SocialSecurityRelation({ simulationId: route.params.simulationId }) })
  }

</script>