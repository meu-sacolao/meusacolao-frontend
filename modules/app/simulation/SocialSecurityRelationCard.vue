<template>
  <AppCard :border="'w-4 hover:bg-orange-400 bg-zinc-100'">
    <template v-slot:header>
      <div class="w-full flex items-center">
        <span 
          class="mr-3 material-icons material-symbols-sharp flex-none transition-all transform cursor-pointer text-4xl"
          :class="showContent ? 'rotate-90' : 'closed rotate-0'"
          @click.stop="toggleCard()"
        >
          chevron_right
        </span>
        <div class="w-full flex flex-col">
          <div class="w-full flex space-x-2 pr-12">
            <h3 class="h3 flex-none text-slate-400">#{{ socialSecurityRelation.seqNumber }}</h3>
            <h3 class="h3 flex-none text-slate-400">{{ socialSecurityRelation.relationType }}</h3>
            <h3 class="h3 truncate ...">{{ socialSecurityRelation.relationOrigin }}</h3>
          </div>

          <div class="w-full flex flex-wrap justify-between mt-4">
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>Documento</template>
              <template v-slot:value>{{ socialSecurityRelation.relationDocument ? socialSecurityRelation.relationDocument : '--' }}</template>
            </AppLabelValue>
            <AppLabelValue class="four-cols-breakdown">
              <template v-slot:label>NIT</template>
              <template v-slot:value>{{ socialSecurityRelation.nit }}</template>
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
    
    <template v-slot:content v-if="showContent">

      <!-- <CnisContributionList
        :contributions="socialSecurityRelation.contributions"
      ></CnisContributionList> -->

      <!-- <pre class="~bg-slate-200">
        {{ socialSecurityRelation }}
      </pre> -->
    </template>
  </AppCard>
</template>

<script setup>

  defineProps({
    socialSecurityRelation: Object
  })

  const showContent = ref(false)

  const toggleCard = () => {
    showContent.value = !showContent.value
  }

</script>