<template>
  <div>
    <a-modal v-model:visible="visible" title="Title" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script>

export default ({
  props: ['visible', 'loading'],
  data() {
    return {}
  },
  methods: {
    handleCancel() {
      console.log('handleCancel');
      this.$emit('handleCancel');
    },
    async handleOk() {
      this.loading = true;
      this.$emit('handleOk', () => this.closeDialog())
    },
    closeDialog() {
      this.loading = false;
    }
  }
})

</script>
