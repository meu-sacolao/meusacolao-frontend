<template>
  <AppCard>
    <template v-slot:header>
      <AppLabelValue>
        <template v-slot:label>Segurado</template>
        <template v-slot:value>{{ client.name }}</template>
      </AppLabelValue>
    </template>
    <template v-slot:content>
      <div class="w-full flex flex-wrap justify-between">
        <AppLabelValue class="four-cols-breakdown mt-4">
          <template v-slot:label>Data do cálculo</template>
          <template v-slot:value>{{ simulation.retirementDate }}</template>
        </AppLabelValue>
        <AppLabelValue class="four-cols-breakdown mt-4">
          <template v-slot:label>Cpf</template>
          <template v-slot:value>{{ client.cpf ? client.cpf : '--' }}</template>
        </AppLabelValue>
        <AppLabelValue class="four-cols-breakdown mt-4">
          <template v-slot:label>Data de nascimento</template>
          <template v-slot:value>{{ client.birthDate ? client.birthDate : '--' }}</template>
        </AppLabelValue>
        <AppLabelValue class="four-cols-breakdown mt-4">
          <template v-slot:label>Gênero</template>
          <template v-slot:value>{{ client.gender }}</template>
        </AppLabelValue>
        <AppLabelValue class="four-cols-breakdown mt-4">
          <template v-slot:label>Nome mãe</template>
          <template v-slot:value>{{ client.motherName ? client.motherName : '--' }}</template>
        </AppLabelValue>
      </div>
    </template>
    
  </AppCard>
</template>

<script setup>

  defineProps({
    client: Object,
    simulation: Object,
  })

  const showContent = ref(false)

  const toggleCard = () => {
    showContent.value = !showContent.value
  }
  
</script>