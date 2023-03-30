<template>
  <div>
    <a-modal
    @keydown.esc="handleCancel"
    v-model:visible="visibleModal"
    :title="title"
    @ok="handleOk"
    :mask-closable="false"
    :destroyOnClose="true"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button v-if="hasSubmit" key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <slot></slot>
    </a-modal>
  </div>
</template>
<script>

export default ({
  props: {
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
  watch: {
   // Watch the `visible` prop for changes
   visibleModal(newValue) {
     if (!newValue) {
       this.handleCancel()
     }
   }
 },
  data() {
    return {
      loading: false,
      visibleModal: false
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.visibleModal = true;
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
