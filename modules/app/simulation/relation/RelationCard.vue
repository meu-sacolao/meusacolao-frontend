<template>
  <AppCard :border="'w-4 hover:bg-orange-400 bg-zinc-100'">
    <template v-slot:header>
      <div class="w-full flex items-center relative">

        <AppButton 
          @click="edit()" 
          class="absolute top-0 right-0 text-zinc-400 hover:text-orange-600">
          <AppIcons icon="edit" />
        </AppButton>

        <div class="w-full flex flex-col">
          <div class="w-full flex space-x-2 pr-12">
            <h3 class="h3 flex-none text-slate-400">#{{ socialSecurityRelation.seqNumber }}</h3>
            <h3 class="h3 flex-none text-slate-400">{{ socialSecurityRelation.relationType }}</h3>
          </div>
          <h3 class="h3 pr-12">{{ socialSecurityRelation.relationOrigin }}</h3>

          <div class="w-full flex flex-wrap mt-4 space-y-2">
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Documento</template>
              <template v-slot:value>{{ socialSecurityRelation.relationDocument ? socialSecurityRelation.relationDocument : '--' }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Início</template>
              <template v-slot:value>{{ socialSecurityRelation.startAt ? socialSecurityRelation.startAt : '--' }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Término</template>
              <template v-slot:value>{{ socialSecurityRelation.endAt ? socialSecurityRelation.endAt : '--' }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Tempo de contribuição</template>
              <template v-slot:value>
                <span v-if="socialSecurityRelation.contributionTime">{{ socialSecurityRelation.contributionTime.time.timeText }}</span>
                <span v-else>--</span>
              </template>
            </AppLabelValue>
          </div>
        </div>
      </div>
    </template>
    
    <template v-slot:content >
      <ContributionList
        :socialSecurityRelation="socialSecurityRelation"
      ></ContributionList>
    </template>

    <RelationEditModal 
      :show="showModal" 
      :socialSecurityRelationId="socialSecurityRelation.id"
      @close="close"
    />

  </AppCard>
</template>

<script setup>

  import ContributionList from '@/modules/app/simulation/relation/contribution/ContributionList.vue'
  import RelationEditModal from '@/modules/app/simulation/relation/RelationEditModal.vue'

  import { storeToRefs } from 'pinia'
  import { useAuthStore } from "@/modules/auth/store"
  const authStore = useAuthStore()

  const { loggedUser } = storeToRefs(authStore)

  defineProps({
    socialSecurityRelation: Object
  })
  
  const showModal = ref(false)

  const edit = () => {
    showModal.value = true
  }

  const close = () => {
    showModal.value = false
  }

</script>