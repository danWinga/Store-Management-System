<template>
    <div>
      <h3>Stores</h3>
      <ul>
        <li v-for="store in stores" :key="store.store_id">
          {{ store.name }}
          <button @click="editStore(store)" class="btn btn-info btn-sm">Edit</button>
          <button @click="deleteStore(store.store_id)" class="btn btn-danger btn-sm">Delete</button>
        </li>
      </ul>
      <button class="btn btn-primary mt-3" @click="addStore">Add Store</button>
      
      <!-- Edit Store Modal -->
      <div v-if="currentStore" class="modal" tabindex="-1" style="display:block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Store</h5>
              <button type="button" class="btn-close" @click="clearEditFields"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="storeName" class="form-label">Store Name</label>
                <input v-model="storeName" type="text" class="form-control" id="storeName" required>
              </div>
              <div class="mb-3">
                <button type="button" class="btn btn-primary" @click="updateStore">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getStores, createStore, deleteStore, updateStore } from '@/api/stores';
  
  export default {
    data() {
      return {
        stores: [],
        currentStore: null,
        storeName: '',
      };
    },
    methods: {
      async fetchStores() {
        try {
          this.stores = await getStores();
        } catch (error) {
          alert('Error fetching stores: ' + (error.message || 'Unknown error'));
        }
      },
      async addStore() {
        try {
          const newStore = { name: 'New Store' };
          await createStore(newStore);
          this.fetchStores();
        } catch (error) {
          alert('Error adding store: ' + (error.message || 'Unknown error'));
        }
      },
      async deleteStore(store_id) {
        try {
          await deleteStore(store_id);
          this.fetchStores();
        } catch (error) {
          alert('Error deleting store: ' + (error.message || 'Unknown error'));
        }
      },
      editStore(store) {
        this.currentStore = store;
        this.storeName = store.name;
      },
      async updateStore() {
        try {
          if (this.currentStore) {
            const updatedStore = { name: this.storeName };
            await updateStore(this.currentStore.store_id, updatedStore);
            this.fetchStores();
            this.clearEditFields();
          }
        } catch (error) {
          alert('Error updating store: ' + (error.message || 'Unknown error'));
        }
      },
      clearEditFields() {
        this.currentStore = null;
        this.storeName = '';
      }
    },
    created() {
      this.fetchStores();
    }
  };
  </script>
  