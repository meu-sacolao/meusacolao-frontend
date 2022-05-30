<template>
  <div class="block my-3 w-full">
    <label v-if="label"><span class="border-b-4 border-cedar-chest">{{label}}</span></label>
    <div class="relative mt-2">
      <div v-if="icon" class="h-full absolute pin-y pin-l flex items-center text-grey pointer-events-none pl-3">
        <AppIcons :icon="icon" />
      </div>

      <input
        v-if="!mask"
        :type="type"
        :id="id_input"
        :placeholder="placeholder || label"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        @keydown.enter="action()"
        class="block appearance-none outline-none w-full h-full border border-grey focus:border-blue-dark bg-grey-light text-grey-darker text-lg py-4 pr-4 pl-9"
      />
      <input
        v-else
        :type="type"
        :id="id_input"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        @keydown.enter="action()"
        v-mask="mask"
        class="block appearance-none outline-none w-full h-full border border-grey focus:border-blue-dark bg-grey-light text-grey-darker text-lg py-4 pr-4 pl-9"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "input-with-icon",
  props: [
    "icon",
    "type",
    "id_input",
    "placeholder",
    "value",
    "label",
    "action",
    'mask'
  ]
}
</script>
