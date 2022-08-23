<template>
  <AppBaseModal :show="showModal" @close="close">
    <div class="w-full flex flex-col space-y-6">
      
      <h3 class="h3 border-l-10 border-orange-500 pl-6 leading-normal mb-4">Adicionar múltiplas contribuições</h3>

      <h5 class="h5 italic" v-if="socialSecurityRelation">Vínculo: <b>#{{ socialSecurityRelation.seqNumber }} {{ socialSecurityRelation.relationOrigin }}</b></h5>

      <AppInputWithIcon 
        v-model:value="multipleContribution.startMonthReference" 
        icon="badge"
        label="Início competência" 
        placeholder="Início competência"
        disabled="true" 
        :mask="'##/####'"
      />

      <AppInputWithIcon 
        v-model:value="multipleContribution.endMonthReference" 
        icon="badge"
        label="Término competência" 
        placeholder="Término competência"
        disabled="true" 
        :mask="'##/####'"
      />

      <AppSelectInput
        v-model:value="multipleContribution.setValueBasedOn"
        :items="valueBasedOn"
        label="Valor baseado em:"
        :keyLabel="'label'"
        :keyValue="'value'"
      />

      <AppMoneyInput
        v-if="multipleContribution.setValueBasedOn === 'FIXED_VALUE'"
        v-model:value="multipleContribution.baseValue" 
        icon="badge"
        label="Valor base" 
        placeholder="Valor"
        :dateReference="multipleContribution.monthReference"
      />

      <AppCheckBox
        v-model:value="multipleContribution.isIgnored"
      >
        Ignorar contribuições
      </AppCheckBox>

      <AppInputWithIcon 
        v-model:value="multipleContribution.ignoredReason" 
        icon="badge"
        label="Motivo" 
        placeholder="Insira um motivo de ignorar estas contribuições (opcional)"
        v-if="multipleContribution.isIgnored"
      />

      <AppCheckBox
        v-model:value="multipleContribution.shouldUpdateExistings"
      >
        Atualizar contribuições existentes
      </AppCheckBox>

      <AppAlert type="warning" v-if="multipleContribution.shouldUpdateExistings">
        Atenção! As contribuições existentes no período entre {{ multipleContribution.startMonthReference }} e {{ multipleContribution.endMonthReference}} 
        do vínculo {{ socialSecurityRelation.relationOrigin }} serão atualizadas de acordo com as informações acima.
      </AppAlert>
      <AppAlert type="warning" v-else>
        Atenção! Esta ação irá criar contribuições mensalmente no período entre {{ multipleContribution.startMonthReference }} e {{ multipleContribution.endMonthReference}} 
        do vínculo {{ socialSecurityRelation.relationOrigin }} podendo criar contribuições duplicadas caso já existam contribuições no mesmo período para este vínculo.
      </AppAlert>

      <div class="w-full flex justify-end mt-10 block">
        <AppButton bg="bg-brand-gradient space-x-2" text="text-white" @click="update()">
          <AppIcons icon="save" />
          <span>Salvar</span>
        </AppButton>
      </div>

    </div>
  </AppBaseModal>

</template>

<script setup>

  import Api from '@/util/Api'
  import emitter from '@/util/emitter'
  import Dates from '@/services/Dates'

  const MULTIPLE_CONTRIBUTIONS_VALUE_BASED = [
    { value: 'FIXED_VALUE', label: 'Valor pré-definido' },
    { value: 'MIN', label: 'Valor mínimo vigente' },
    { value: 'MAX', label: 'Valor teto vigente (máximo)' },
  ]

  const mutipleContributionInitialValue = {
    simulationId: null,
    socialSecurityRelationId: null,
    startMonthReference: null,
    endMonthReference: null,
    baseValue: 0,
    setValueBasedOn: 'FIXED_VALUE',
    isIgnored: false,
    ignoredReason: '',
    shouldUpdateExistings: true,
  }

  onMounted(() => {
    emitter.on('openModalEditMultipleContributions', ({ socialSecurityRelation: socialSecurityRelationToSet }) => {
      showModal.value = true
      socialSecurityRelation.value = socialSecurityRelationToSet
      multipleContribution.value.socialSecurityRelationId = socialSecurityRelation.value.id
      multipleContribution.value.simulationId = socialSecurityRelation.value.simulationId
      if(socialSecurityRelation.value.startAt) multipleContribution.value.startMonthReference = Dates.format(socialSecurityRelation.value.startAt, 'MM/yyyy')
      if(socialSecurityRelation.value.endAt) multipleContribution.value.endMonthReference = Dates.format(socialSecurityRelation.value.endAt, 'MM/yyyy')
    })
  })

  onBeforeUnmount(() => {
    emitter.off('openModalEditMultipleContributions')
  })

  const socialSecurityRelation = ref(null)
  const multipleContribution = ref(mutipleContributionInitialValue)
  const valueBasedOn = ref(MULTIPLE_CONTRIBUTIONS_VALUE_BASED)

  const isLoading = ref(false)
  const showModal = ref(false)

  const close = () => {
    showModal.value = false
    multipleContribution.value = { ...mutipleContributionInitialValue }
  }

  const update = () => {
    
    Api.post(`/app/contribution/multiple/updateOrCreate`, multipleContribution.value).then(({ data }) => {
      isLoading.value = true
      for(const contribution of data.contributions) {
        emitter.emit('contributionUpdated', { contribution })
        emitter.emit('simulationIsPending')
      }
      close()
    })
    .catch((err) => {
      console.log(err)
    })

  }


</script>
