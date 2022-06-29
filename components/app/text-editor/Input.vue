<template>
  <div class="block">
    <label>{{ label }}</label>
    <div v-bind:id="input_id" class="pell mb-2 hover:shadow"></div>
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
    }, 500);
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

      editor.content.innerHTML = that.value;
    },
  },
}
</script>
