<template>
    <div class="thread-details">
      <div class="thread-info">
        <h2 class="thread-title">{{ threadData.title }}</h2>
        <div class="thread-date">Posted By {{ threadData.created_by_name }} - Apartment {{ threadData.created_by_apartment }}, on {{ threadData.created_timestamp }}</div>
        <div class="thread-content">{{ threadData.content }}</div>
      </div>
      <div class="responses-section">
        <div v-for="response in  responsesData " :key="response.id" class="response-card">
          <div class="response-text">{{ response.message }}</div>
          <div class="response-footer">
            <div class="response-author">Posted by {{ response.created_by_name }} - {{ response.created_by_apartment }}</div>
            <div class="response-date">{{ formattedResponseDate(response.created_timestamp) }}</div>
          </div>
        </div>
        <div class="add-response">
          <textarea v-model="newResponseText" placeholder="Add a response..."></textarea>
          <button @click="submitResponse">Post Response</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
  export default {
   
    data() {
      return {
        newResponseText: '',
      };
    },
		async mounted() {
			window.analytics.page('Thread Details');  
	  	await this.getUserData();
			await this.getThread({ thread_id: this.$route.params.id});
		},
		
    computed: {
			...mapState({
				threadData: state => state.forum.thread,
				BuildingID: state => state.auth.user.building_id,
				personalInfo: state => state.profile.userInfo,
        responsesData: state => state.forum.responses_data,
			}),
      formattedThreadDate() {
        const date = new Date(this.thread.date);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    methods: {
        ...mapActions('forum', [
          'getThread',
          'addResponse',
        ]),
			...mapActions('profile', ['getUserData']),

      formattedResponseDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
      async submitResponse() {
        // Add logic to submit the new response
        try {
          let response = {}
          response.message = this.newResponseText;
          response.created_by_name = this.personalInfo.name;
          response.created_by_apartment = this.personalInfo.apartment;
          response.created_by_uid = this.personalInfo.uid;
          let res = await this.addResponse({
            thread_id: this.threadData.id,
            response: response,
            BuildingID: this.BuildingID,
          });
          if (res) {
            console.log('response added');
          }
          else {
            console.log('response not added');
          }
          this.newResponseText = '';
        }
        catch (err) {
          console.log(err);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .thread-details {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .thread-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .thread-date {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .thread-content {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .response-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .response-text {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .response-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: #666;
  }
  
  .add-response {
    margin-top: 1rem;
  }
  
  .add-response textarea {
    width: 100%;
    height: 100px;
    resize: none;
    margin-bottom: 1rem;
  }
  
  .add-response button {
    background-color: #0077cc;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
</style>
  