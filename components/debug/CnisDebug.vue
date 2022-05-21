<template>
  <AppCard v-for="(debugItem, index) in _debugItems" :key="`debug_${debugItem}`">
    <template v-slot:header>
      <div class="w-full flex items-center">
        <span 
          class="mr-3 material-icons-round flex-none transition-all transform cursor-pointer text-4xl"
          :class="hideItemsToDebug.indexOf(index) > -1 ? 'rotate-90' : 'closed rotate-0'"
          @click="toggleCard(index)"
        >
          chevron_right
        </span>
        <div class="w-full flex flex-col">
          <div class="w-full flex space-x-2 pr-12">
            <h3 class="h3 flex-none text-slate-400">#{{ debugItem.title }}</h3>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:content v-if="hideItemsToDebug.indexOf(index) > -1">
      <CnisContributionList
        v-if="debugItem.type == 'contributions'"
        :contributions="debugItem.data"
      ></CnisContributionList>

      <pre v-else class="bg-slate-100 p-2">{{ debugItem.data }}</pre>
    </template>
  </AppCard>
</template>

<script>
export default {
  name: 'CnisDebug',
  props: ['_debugItems'],
  data() {
    return {
      hideItemsToDebug: []
    }
  },
  methods: {
    toggleCard(index) {
      if(this.hideItemsToDebug.indexOf(index) > -1) {
        this.hideItemsToDebug.splice(index, 1)
      } else {
        this.hideItemsToDebug.push(index)
      }
    }
  }
}
</script>
