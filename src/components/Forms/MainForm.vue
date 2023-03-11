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

    <a-form-item v-for="(input, index) in formFields" :key="index" :label="input.label" :prop="input.name"  :colon="false">
        <a-input v-if="input.type == 'text'" v-model="formState[input.name]" :placeholder="input.placeholder"/>
        <a-input v-else-if="input.type == 'currency'" prefix="$" v-model="formState[input.name]" :placeholder="input.placeholder"/>
        <a-select v-else-if="input.type == 'selectBox'" v-model="formState[input.name]">
          <a-select-option v-for="(option, index) in input.options" :key="index" :value="option.value">{{option.text}}</a-select-option>
        </a-select>

        <a-date-picker v-else-if="input.type == 'date'" v-model="formState[input.name]" :format="'MM/DD/YYYY'" />

        <a-upload v-else-if="input.type == 'uploadFile'"
            :v-model="formState[input.name]"
            :show-upload-list="true"
            @change=""
            :beforeUpload="beforeUpload"
           >
            <a-button>Click to Upload</a-button>
        </a-upload>

    </a-form-item>

    <p style="color:red;" v-if="!isSuccess">Error in submit form: Please try again</p>

  </a-form>
</template>


<script>

import { mapActions } from 'vuex';

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
    },
    resetForm() {
      // form.resetFields();
    },
    //this one should save the file to the store so it can be uploaded from the card
    async beforeUpload(file) {
      await this.prepareFile(file)
    }
    ,
    //ended up not using this because it uploads the file before form is submitted
    async handleChange(info) {
      console.log('handleChange start',info)
      if (info.file.status === 'done') {
        console.log('handleChange done',info.file.response)
        await this.getFile("textinsteadoffile")
        this.formState.file = info.file.response.file
        this.formState.name = info.file.response.name
      }
      else {
        console.log('handleChange not done',info.file.status, info.file.response, info.file)
      }
    },
			...mapActions('documents', ['prepareFile'])
    
  }
})

</script>
