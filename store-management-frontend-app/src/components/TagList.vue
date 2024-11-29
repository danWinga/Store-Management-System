<template>
    <div>
      <h3>Tags</h3>
      <ul>
        <li v-for="tag in tags" :key="tag.tag_id">
          {{ tag.name }}
          <button @click="deleteTag(tag.tag_id)" class="btn btn-danger btn-sm">Delete</button>
          <button @click="assignTagToItem(tag.tag_id)" class="btn btn-secondary btn-sm ml-2">Assign to Item</button>
        </li>
      </ul>
      <button class="btn btn-primary mt-3" @click="addTag">Add Tag</button>
  
      <!-- Add Tag Modal -->
      <div v-if="showModal" class="modal" tabindex="-1" style="display:block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Tag</h5>
              <button type="button" class="btn-close" @click="clearModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="tagName" class="form-label">Tag Name</label>
                <input v-model="newTagName" type="text" class="form-control" id="tagName" required>
              </div>
              <button type="button" class="btn btn-primary" @click="createTag">Save Tag</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {
    getTagsForStore,
    createTagForStore,
    assignTagToItem,
    unassignTagFromItem,
    deleteTag,
  } from '@/api/tags';
  
  export default {
    data() {
      return {
        tags: [],
        store_id: 1, // Example store ID, update as needed
        newTagName: '',
        showModal: false,
        errorMessage: '',
      };
    },
    methods: {
      async fetchTags() {
        try {
          this.tags = await getTagsForStore(this.store_id);
        } catch (error) {
          this.errorMessage = 'Error fetching tags: ' + (error.message || 'Unknown error');
          console.error(error);
        }
      },
      async addTag() {
        this.showModal = true;
      },
      async createTag() {
        try {
          const newTag = { name: this.newTagName };
          await createTagForStore(this.store_id, newTag);
          this.showModal = false; // Close modal after adding
          this.fetchTags();
        } catch (error) {
          this.errorMessage = 'Error creating tag: ' + (error.message || 'Unknown error');
          console.error(error);
        }
      },
      async deleteTag(tag_id) {
        try {
          await deleteTag(tag_id);
          this.fetchTags(); // Refresh tags list after deletion
        } catch (error) {
          this.errorMessage = 'Error deleting tag: ' + (error.message || 'Unknown error');
          console.error(error);
        }
      },
      async assignTagToItem(tag_id) {
        try {
          const item_id = 1; // Example item ID, update as needed
          await assignTagToItem(item_id, tag_id);
          this.fetchTags(); // Refresh tags list after assigning
        } catch (error) {
          this.errorMessage = 'Error assigning tag to item: ' + (error.message || 'Unknown error');
          console.error(error);
        }
      },
      async unassignTagFromItem(tag_id) {
        try {
          const item_id = 1; // Example item ID, update as needed
          await unassignTagFromItem(item_id, tag_id);
          this.fetchTags(); // Refresh tags list after unassigning
        } catch (error) {
          this.errorMessage = 'Error unassigning tag from item: ' + (error.message || 'Unknown error');
          console.error(error);
        }
      },
      clearModal() {
        this.showModal = false;
        this.newTagName = '';
      },
    },
    created() {
      this.fetchTags();
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styling for modal */
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-dialog {
    max-width: 500px;
    margin: 10% auto;
  }
  </style>
  