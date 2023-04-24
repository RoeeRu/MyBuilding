<template>
    <div class="thread-card">
      <div class="thread-info">
        <router-link :to="{ name: 'ThreadDetails', params: { id: thread.id } }" class="thread-title">
          {{ thread.title }}
        </router-link>
        <div class="thread-content">{{ thread.content }}</div>
        <div class="thread-stats">
          <div class="responses-count">{{ thread.num_responses }} </div>
          <div class="thread-date">Posted by {{ thread.created_by_name }}, Apartment {{ thread.created_by_apartment }} on {{ thread.created_timestamp }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      thread: {
        type: Object,
        required: true,
      },
    },
    computed: {
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
  