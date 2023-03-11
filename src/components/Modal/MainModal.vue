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
        <a-button v-if="hasSubmit" key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <slot></slot>
    </a-modal>
  </div>
</template>
<script>

export default ({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false
    },
    handleCancel: {
      type: Function,
      required: true
    },
    hasSubmit: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handleOk() {
      this.loading = true;
      this.$emit('handleOk', () => this.handleOnFinish())
    },
    handleOnFinish() {
      this.loading = false;
    }
  }
})

</script>


<style media="screen">
  .ant-modal-close{
    display: none;
  }
</style>
