<template>
  <div>
    <h1>PAGE NOT FOUND</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    this.$message({
      message: '页面不存在，将会在2秒后跳转至主页面。',
      type: 'warning',
      duration: 2000,
      onClose: () => {
        this.$router.push({
          name: 'index'
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
h1 {
  position: absolute;
  top: 50%;
  left: 40%;
}
</style>
