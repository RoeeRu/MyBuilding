<template>
  <a-form
    v-bind="layout"
    ref="form"
    name="nest-messages"
    @finish="onFinish"
  >

    <a-form-item v-for="(input, index) in formFields" :key="index" :label="input.label" :prop="input.name"  :colon="false">
        <a-input v-if="input.type == 'text'" v-model="localFormData[input.name]" :placeholder="input.placeholder"/>

        <a-input  v-else-if="input.type == 'currency'"
        prefix="$"
        v-model="localFormData[input.name]"
        @blur="$v.localFormData[input.name].$touch()"
        :class="{ error: $v.localFormData[input.name].$error && $v.localFormData[input.name].$dirty }"
        :placeholder="input.placeholder"/>

        <a-select v-else-if="input.type == 'selectBox'" v-model="localFormData[input.name]">
          <a-select-option v-for="(option, index) in input.options" :key="index" :value="option.value">{{option.text}}</a-select-option>
        </a-select>

        <a-date-picker v-else-if="input.type == 'date'" v-model="localFormData[input.name]" format="MM/DD/YYYY" />

        <a-upload v-else-if="input.type == 'uploadFile'"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :custom-request="customRequest"
            :v-model="localFormData[input.name]"
            :show-upload-list="true"
           >
            <a-button>Click to Upload</a-button>
        </a-upload>

        <div v-if="$v.localFormData[input.name].$error && $v.localFormData[input.name].$dirty">
          <div style="color:red;" v-if="$v.localFormData[input.name].hasOwnProperty('required') && !$v.localFormData[input.name].required">This field is required</div>
          <div style="color:red;" v-if="$v.localFormData[input.name].hasOwnProperty('numeric') && !$v.localFormData[input.name].numeric">Only numbers allowed</div>
        </div>

    </a-form-item>


    <p style="color:red;" v-if="!isSuccess">Error in submit form: Please try again</p>

  </a-form>
</template>


<script>

import { required, numeric } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import axios from 'axios';


export default ({
  components: {},
  props: {
    formFields: {
      type: Array,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mixins: [validationMixin],
  mounted() {
  // Initialize formData with empty values for each field in formFields
  this.formFields.forEach(field => {
    if(field.hasOwnProperty('value')) {
      this.$set(this.localFormData, field.name, field.value);
    } 
    else if (field.type === 'uploadFile') {
      this.uploadUrl = field.actionPath;
      this.$set(this.formData, field.name, '');
      this.uploadHeaders.Authorization = 'Bearer ' + field.userToken
    }
    else {
      this.$set(this.formData, field.name, '');
      this.$set(this.localFormData, field.name, '');
    }
  });
},
  data() {
    return {
      formData: {},
      localFormData: {},
      uploadUrl: '',
      uploadHeaders: {
        'Authorization': '',
        'Content-Type': 'multipart/form-data'
      },
      isSuccess: true,
      layout: {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 13,
        }
      }
    }
  },
  validations() {
    const validations = {};

    this.formFields.forEach((field) => {
      const fieldValidations = {};

      field.rules.forEach((rule) => {
        switch (rule) {
          case 'required':
            fieldValidations[rule] = required;
            break;
          case 'email':
            fieldValidations[rule] = email;
            break;
          case 'numeric':
            fieldValidations[rule] = numeric;
            break;
          default:
            break;
        }
      });

      validations[field.name] = fieldValidations;
    });

    return {
      localFormData: validations,
    };
  },
  methods: {
    onFinish(isSuccess) {
      //handle validation
      this.isSuccess = isSuccess
    },
    resetForm() {
      // form.resetFields();
    },
    validate() {
      this.$v.$touch();
      let validSuccess = !this.$v.$invalid;
      if(validSuccess) {
        this.formFields.forEach(field => {
          this.$set(this.formData, field.name, this.localFormData[field.name]);
          if(field.type === 'date' && !this.isEdit) {
            this.formData[field.name] = this.formattedDate(this.formData[field.name].toDate())
          }
        });
      }
      return validSuccess;
    },

    customRequest(options) {
      // Override the default AJAX request behavior
      // Add the custom headers to the request
      Object.assign(options.headers, this.uploadHeaders);

      options.withCredentials = true;
      options.url = this.uploadUrl
      options.data = {
        file: options.file
      };
      axios.request(options)
        .then(response => {
          // Handle the successful response
          if(response.data.status) {
            options.onSuccess(response.data, options.file)
            this.localFormData.location = response.data.url
            this.formData.location = response.data.url
            return;
          }
          options.onError('failed')
        })
        .catch(error => {
          // Handle the error
          console.log('Upload error:', error);
          options.onError(error, options.file)
        });
    },
    formattedDate(date) {
      const today = new Date(date);
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${month}/${day}/${year}`;
    },

  }
})

</script>
