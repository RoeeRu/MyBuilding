<template>
    <div class="comment-card">
      <div v-if="!editMode" class="comment-info">
        <p>{{ comment.content }}</p>
        <p>Posted by {{ comment.author }} on {{ formatDate(comment.date) }}</p>
        <button @click="toggleEditMode">Edit</button>
        <button @click="deleteComment">Delete</button>
      </div>
  
      <div v-if="editMode" class="comment-edit-form">
        <textarea v-model="editedCommentContent"></textarea>
        <button @click="updateComment">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      comment: Object,
    },
    data() {
      return {
        editMode: false,
        editedCommentContent: "",
      };
    },
    methods: {
      formatDate(date) {
        // Format date as desired
        return new Date(date).toLocaleString();
      },
      toggleEditMode() {
        this.editMode = !this.editMode;
        if (this.editMode) {
          this.editedCommentContent = this.comment.content;
        }
      },
      updateComment() {
        this.$emit("edit-comment", this.comment.id, {
          ...this.comment,
          content: this.editedCommentContent,
        });
        this.toggleEditMode();
      },
      cancelEdit() {
        this.toggleEditMode();
      },
      deleteComment() {
        this.$emit("delete-comment", this.comment.id);
      },
    },
  };
  </script>
  