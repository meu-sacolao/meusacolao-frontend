<template>
  <AppCard border="w-4 bg-orange-400">
    <template v-slot:header>
      <div class="w-full flex items-center">
        <span 
          class="mr-3 material-icons-round flex-none transition-all transform cursor-pointer text-4xl"
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
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Documento</template>
              <template v-slot:value>{{ socialSecurityRelation.relationDocument ? socialSecurityRelation.relationDocument : '--' }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>NIT</template>
              <template v-slot:value>{{ socialSecurityRelation.nit }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Início</template>
              <template v-slot:value>{{ socialSecurityRelation.startAt ? socialSecurityRelation.startAt : '--' }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Término</template>
              <template v-slot:value>{{ socialSecurityRelation.endAt ? socialSecurityRelation.endAt : '--' }}</template>
            </LabelValue>
          </div>
        </div>
      </div>
    </template>
    
    <template v-slot:content v-if="showContent">

      <CnisContributionList
        :contributions="socialSecurityRelation.contributions"
      ></CnisContributionList>

      <!-- <pre class="~bg-slate-200">
        {{ socialSecurityRelation }}
      </pre> -->
    </template>
  </AppCard>
</template>

<script>
import LabelValue from '../app/LabelValue.vue'
export default {
    name: "CnisSocialSecurityRelationCard",
    props: ["socialSecurityRelation"],
    data() {
        return {
            showContent: false
        };
    },
    methods: {
        toggleCard() {
          this.showContent = !this.showContent;
        }
    },
    components: { LabelValue }
}
</script>

<style>

</style>