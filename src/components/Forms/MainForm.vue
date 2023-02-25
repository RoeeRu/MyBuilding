<template>
  <a-form
    :model="formState"
    :rules="formRules"
    v-bind="layout"
    ref="form"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <a-form-item v-for="(input, index) in formFields" :key="index" :label="input.label" :prop="input.name">
        <a-input v-model="formState[input.name]" :placeholder="input.placeholder"/>
    </a-form-item>
    <p style="color:red;" v-if="!isSuccess">Error in submit new transaction: Please try again</p>

  </a-form>
</template>


<script>

export default ({
  components: {},
  props: ['formFields', 'formState'],
  data() {
    return {
      isSuccess: true,
      layout: {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 13,
        }
      },
      formRules: {
        name: [
          { required: true, message: 'Name is required' },
        ],
      },
      validateMessages: {
        required: 'Please enter a value',
        email: 'Please enter a valid email address',
        number: 'Please enter a valid number'
      },
      // formState: {
      //   user: {
      //     name: '',
      //     age: undefined,
      //     email: '',
      //     website: '',
      //     introduction: '',
      //   }
      // }
    }
  },
  methods: {
    onFinish(isSuccess) {
      //handle validation
      this.isSuccess = isSuccess
      if(isSuccess){
        console.log('isSuccess');
      } else {
        console.log('isNotSuccess');
      }


    },
    resetForm() {
      // form.resetFields();
    },
  }
})

</script>
