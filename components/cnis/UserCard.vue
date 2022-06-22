<template>
  <AppCard>
    <template v-slot:header>
      <div class="w-full flex items-center">
        <div class="w-full flex flex-col">
          <div class="w-full flex space-x-2 pr-12">
            <h3 class="h3 truncate leading-relaxed ...">{{ user.name }}</h3>
          </div>

          <div class="w-full flex flex-wrap justify-between mt-4">
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Cpf</template>
              <template v-slot:value>{{ user.cpf ? user.cpf : '--' }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Data de nascimento</template>
              <template v-slot:value>{{ user.birthDate ? user.birthDate : '--' }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>NIT</template>
              <template v-slot:value>{{ user.nit ? user.nit : '--' }}</template>
            </LabelValue>
            <LabelValue class="four-cols-breakdown">
              <template v-slot:label>Nome mãe</template>
              <template v-slot:value>{{ user.motherName ? user.motherName : '--' }}</template>
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
  props: ["user"],
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