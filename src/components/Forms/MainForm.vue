<template>
  <a-form
    v-bind="layout"
    ref="form"
    name="nest-messages"
    @finish="onFinish"
    :title="title"
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
            :custom-request="customRequestUpload"
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
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default ({
  components: {},
  props: {
    title: {
      type: String,
      required: false,
      default: 'form name'
    },
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
      this.$set(this.formData, field.name, field.value);
    }
    else if (field.type === 'uploadFile') {
      this.$set(this.formData, field.name, '');
      this.$set(this.localFormData, field.name, '');
      this.BuildingID = field.BuildingID;
    }
    else {
      this.$set(this.formData, field.name, '');
      this.$set(this.localFormData, field.name, '');
    }
  });
},
  data() {
    return {
      BuildingID: '',
      formData: {},
      localFormData: {},
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
      try {
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
    } catch (e) {
        console.log('validation error',e);
      }

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
      this.submitTrackEvent();
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

    submitTrackEvent() {
      //submit track event to Segment
      try {
        window.analytics.track('Form Submit', {
          "form_type": "Create Ticket",
        "form_name": this.title,
        "form_value": "1",
        "form_status": this.isSuccess ? "Success" : "Error",
        "form_fields": this.formData,
          });
      } catch (e) {
          console.log('segment error',e);
      }

    },

    
    customRequestUpload(options) {
      //custom upload function to handle the upload request and response 
      //uploading the file to firebase storage

      const storage = getStorage();

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: options.file.type,
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const location = this.BuildingID + '/documents/' + options.file.name;
      const storageRef = ref(storage, location);
      const uploadTask = uploadBytesResumable(storageRef, options.file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            options.onSuccess(uploadTask.snapshot, options.file)
            this.localFormData.location = downloadURL
            this.formData.location = downloadURL
            this.localFormData.name = options.file.name
            this.formData.name = options.file.name
            return;
          });
        }
      );
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
