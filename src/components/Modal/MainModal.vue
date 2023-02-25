<template>
  <div>
    <a-modal
    v-model:visible="visible"
    :title="title"
    @ok="handleOk"
    :mask-closable="false"
    :destroyOnClose="true"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <slot></slot>
    </a-modal>
  </div>
</template>
<script>

export default ({
  props: ['visible', 'title', 'handleCancel'],
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handleOk() {
      this.loading = true;
      this.$emit('handleOk', () => this.handleLoading())
    },
    handleLoading() {
      this.loading = false;
      this.modalVisible = false
    }
  }
})

</script>


<style media="screen">
  .ant-modal-close{
    display: none;
  }
</style>
