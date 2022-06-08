<template>
  <AppCard>
    <template v-slot:header>
      <div class="w-full flex items-center">
        <div class="w-full flex flex-col">
          <div class="w-full flex space-x-2 pr-12">
            <h3 class="h3 truncate leading-relaxed ...">{{ cnisParsedData.user.name }}</h3>
          </div>

          <div class="w-full flex flex-wrap justify-between mt-4">
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Cpf</template>
              <template v-slot:value>{{ cnisParsedData.user.cpf ? cnisParsedData.user.cpf : '--' }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>NIT</template>
              <template v-slot:value>{{ cnisParsedData.user.nit ? cnisParsedData.user.nit : '--' }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Nome mãe</template>
              <template v-slot:value>{{ cnisParsedData.user.motherName ? cnisParsedData.user.motherName : '--' }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Email</template>
              <template v-slot:value>{{ cnisParsedData.user.email ? cnisParsedData.user.email : '--' }}</template>
            </LabelValue>
          </div>
        </div>
      </div>
    </template>
    
  </AppCard>
</template>

<script>
import LabelValue from '@/components/app/LabelValue.vue'
export default {
  name: "CnisUserCard",
  props: ["cnisParsedData"],
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    toggleCard() {
      this.showContent = !this.showContent;
    }
  },
  components: { LabelValue }
}
</script>