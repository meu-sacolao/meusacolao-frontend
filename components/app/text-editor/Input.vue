<template>
  <div class="block">
    <label class="block mb-2" v-if="label">
      <span class="border-b-4 border-zinc-200 ">{{ label }}</span>
    </label>
    <div v-bind:id="input_id" class="pell mb-2 focus:shadow-sm hover:shadow"></div>
  </div>
</template>

<script>
//Pell editor
import pell from 'pell'
import pellActions from './pellActions'
import sanitizeHtml from './sanitizeHtml'
import unescape from './unescape'

export default {
  name: "text-editor",
  props: ["label", "input_id", "placeholder", "value", "has_error"],
  mounted() {
    let that = this;
    setTimeout(() => {
      that.pellInit();
    }, 100)
  },
  methods: {
    change(evt) {
      this.$emit("update:value", this.value)
    },

    pellInit() {
      let that = this;

      let editor = pell.init({
        element: document.getElementById(that.input_id),
        onChange: (html) => {
          html = unescape(html)

          let clean = sanitizeHtml(html)

          that.$emit("update:value", clean)
        },
        actions: pellActions,
      })

      editor.content.innerHTML = that.value
    },
  },
}
</script>


<style lang="scss">
  .pell-actionbar {
    padding: 12px;
    background-color: #FFF;
  }

  .pell-content {
    height: 200px;
    padding: 16px !important;
    background-color: #FFF;
  }

  .pell {
    border: 1px solid #e2e8f0;
    border-radius: 0;
    box-shadow: none;
  }
</style>
