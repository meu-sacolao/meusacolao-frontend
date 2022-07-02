<template>
 <div class="block my-3 w-full">
    <label v-if="label">
      <span class="border-b-4 border-zinc-200">{{ label }}</span>
    </label>
    <div class="relative mt-2">
      <div
        v-if="icon"
        class="icon-classes"
      >
        <AppIcons :icon="icon" color="text-slate-300" size="18" />
      </div>
    <select 
      :name="label"
      :id="label"  
      v-model="childValue"
      class="select-input-classes"
      :class="[icon ? 'pl-9' : 'pl-4']"
    >
      <option :value="null" disabled>Selecione uma opção</option>
      <option v-for="item in getItems" :value="item[keyValue]" :key="item[keyValue]">{{ item[keyLabel] }}</option>
    </select>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PsInputSelect',
  props: {
    /**
     * It sets the items which will be rendered within the select input.
     */
    items: {
      required: true
    },
    value: {
      default: '',
      required: true
    },
    /**
     * It sets the value label of the select input if needed.
     */
    label: {
      default: ''
    },

    icon: {
      type: [String, Boolean],
      default: false
    },

    /**
     * It sets the key label of your items if needed.
     */
    keyLabel: {
      default: 'title'
    },
    /**
     * It sets the key value of yout items if needed.
     */
    keyValue: {
      default: 'id'
    },
    /**
     * It disables the select input. All mouse events are disabled.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * It sets the layout of the select input. eg: default and mini.
     */
    layout:{
      type: String,
      default: 'default',
      validator: (value) => ['default','mini'].includes(value)
    }
  },
  computed: {
    getComponentClass(){
      return `layout-${this.layout}`
    },
    childValue: {
      get() {
        return this.value
      },
      set(value) {
        if(this.isString) return this.$emit('update:value', value)
        const finded = find(this.items, { [this.keyValue]: value })
        this.$emit('update:value', value)
        this.$emit('change', finded)
      }
    },
    isString() {
      return  this.items.length > 0 && typeof this.items[0] === 'string'
    },
    getItems() {
      if (this.items.length > 0 && typeof this.items[0] === 'string') {
        return this.items.map((item) => { 
          return {
            [this.keyLabel]: item,
            [this.keyValue]: item,
          }
        })
      } else {
        return this.items
      }
    },
  },
}
</script>

<style lang="scss">

  .select-input-classes {
    @apply block appearance-none outline-none w-full h-full border border-slate-200 focus:border-slate-300 focus:shadow-sm hover:shadow text-lg py-4 pr-4;
  }

  .select-icon-classes {
    @apply h-full absolute inset-y-0 left-0 flex items-center text-slate-200 pointer-events-none pl-3;
  }

</style>
