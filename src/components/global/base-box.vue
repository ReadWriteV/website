<template>
  <div :class="className">
    <div class="box-header">
      <slot name="box-title">
        <div class="box-title">{{ title }}</div>
      </slot>
    </div>
    <div class="box-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseBox',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    className () {
      return 'box-' + this.type
    }
  }
}
</script>

<style lang="scss" scoped>
.box-body {
  margin: 10px;
}
</style>
