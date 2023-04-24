<template>
    <div class="thread-card">
      <div class="thread-info">
        <router-link :to="{ name: 'ThreadDetails', params: { id: thread.id } }" class="thread-title">
          {{ thread.title }}
        </router-link>
        <div class="thread-content">{{ thread.content }}</div>
        <div class="thread-stats">
          <div class="responses-count">{{ thread.num_responses }} </div>
          <div class="actions-menu" v-if="userUID === thread.created_by_uid">
            <a-dropdown>
					<a class="ant-dropdown-link" @click="e => e.preventDefault()">
					Actions <a-icon type="down" />
					</a>
					<a-menu slot="overlay">
            <a-menu-item>
						<a href="javascript:;" v-on:click="DeleteTopic(thread)">Delete</a>
					</a-menu-item>
          </a-menu>
          </a-dropdown>
          </div>
          <div class="thread-date">Posted by {{ thread.created_by_name }}, Apartment {{ thread.created_by_apartment }} on {{ thread.created_timestamp }}</div>
        </div>
      </div>
    </div>
  </template>
   
  <script>
  import { mapActions, mapState } from 'vuex';

  export default {
    props: {
      thread: {
        type: Object,
        required: true,
      },
    },
    computed: {
    ...mapState({
          userUID: (state) => state.auth.user.uid,
        }),
      formattedDate() {
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
        async DeleteTopic(thread) {
			if(confirm("Do you really want to delete the message and all its responses? This can not be undone!")){
				console.log("deleting message", thread.key);

				try {
					let res = await this.deleteTopic({topic: thread});
					} catch (e) {
						console.log('modalHandleOk error', e)
					}
			}
        },
        ...mapActions({
          deleteTopic: 'forum/deleteTopic',
        }),
      },
  };
  </script>
  
  <style scoped>
  .thread-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #fff;
  }
  
  .thread-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #0077cc;
    text-decoration: none;
  }
  
  .thread-title:hover {
    text-decoration: underline;
  }
  
  .thread-content {
    margin: 0.5rem 0;
  }
  
  .thread-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: #666;
  }
  
  .responses-count {
    font-weight: bold;
  }
  </style>
  