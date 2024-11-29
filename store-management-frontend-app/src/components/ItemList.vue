<template>
  <div>
    <h2>Items</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Store</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item.id">
          <td v-if="editingItemId === item.id">
            <input v-model="editableItem.name" class="form-control" placeholder="Item Name" />
          </td>
          <td v-else>
            {{ item.name }}
          </td>
          <td v-if="editingItemId === item.id">
            <input v-model.number="editableItem.price" type="number" class="form-control" placeholder="Price" />
          </td>
          <td v-else>
            ${{ item.price }}
          </td>
          <td v-if="editingItemId === item.id">
            <input v-model="editableItem.store.name" class="form-control" placeholder="Store Name" />
          </td>
          <td v-else>
            {{ item.store.name }}
          </td>
          <td v-if="editingItemId === item.id">
            <input v-model="editableItem.tags" class="form-control" placeholder="Tags (comma separated)" />
          </td>
          <td v-else>
            {{ item.tags.join(', ') }}
          </td>
          <td>
            <div v-if="editingItemId === item.id">
              <button @click="updateItem(item.id)" class="btn btn-success btn-sm">Save</button>
              <button @click="cancelEdit" class="btn btn-danger btn-sm">Cancel</button>
            </div>
            <div v-else>
              <button @click="startEdit(item)" class="btn btn-primary btn-sm">Edit</button>
              <button @click="deleteItem(item.id)" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="btn btn-secondary btn-sm"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="btn btn-secondary btn-sm"
      >
        Next
      </button>
    </div>

    <button class="btn btn-primary" @click="addItem">Add Item</button>
    <!-- Add Item Modal -->
    <div v-if="isAddItemDialogVisible" class="modal show" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Item</h5>
            <button type="button" class="btn-close" @click="closeAddItemDialog"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitAddItem">
              <div class="mb-3">
                <label for="itemName" class="form-label">Name</label>
                <input
                  id="itemName"
                  v-model="editableItem.name"
                  class="form-control"
                  placeholder="Item Name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="itemPrice" class="form-label">Price</label>
                <input
                  id="itemPrice"
                  v-model.number="editableItem.price"
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="itemStore" class="form-label">Store ID</label>
                <input
                  id="itemStore"
                  v-model.number="editableItem.store_id"
                  type="number"
                  class="form-control"
                  placeholder="Store ID"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Add Item</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { fetchItems, createItem, updateItem, deleteItem } from '../api/items';

export default {
  data() {
    return {
      items: [],
      editingItemId: null,
      editableItem: {
        name: '',
        price: null,
        store: {
          name: '',
        },
        tags: [],
      },
      currentPage: 1, // Current page
      itemsPerPage: 5, // Number of items per page
    };
  },
  computed: {
    // Paginated items to be shown on the current page
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.items.slice(start, start + this.itemsPerPage);
    },

    // Total number of pages
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
  },
  methods: {
    // Fetch all items
    async fetchItems() {
      try {
        const fetchedItems = await fetchItems();
        this.items = fetchedItems; // Assign the fetched data to items
      } catch (error) {
        console.error('Error fetching items:', error.message);
        alert('Failed to fetch items. Please try again.');
      }
    },

    // Add a new item
    // Add a new item
async addItem() {
  try {
    const newItem = {
      name: this.editableItem.name || 'New Item',  // Default name if not provided
      price: this.editableItem.price || 10,         // Default price if not provided
      store_id: 1,                                 // Assuming store_id is 1, change if necessary
    };

    await createItem(newItem); // Call API to create item
    this.fetchItems();  // Fetch updated list of items
    this.cancelEdit();  // Reset form after adding item
  } catch (error) {
    console.error('Error adding item:', error.message);
    alert('Failed to add the item. Please try again.');
  }
},

    // Start editing an item
    startEdit(item) {
      this.editingItemId = item.id;
      this.editableItem = { ...item };
    },

    // Cancel editing
    cancelEdit() {
      this.editingItemId = null;
      this.editableItem = { name: '', price: null, store: { name: '' }, tags: [] };
    },

    // Update an item
async updateItem(id) {
  try {
    // Create a payload with only the required fields
    const payload = {
      name: this.editableItem.name,
      price: this.editableItem.price,
    };
    await updateItem(id, payload);
    this.cancelEdit();
    this.fetchItems();
  } catch (error) {
    console.error('Error updating item:', error.message);
    alert('Failed to update the item. Please try again.');
  }
},

    // Delete an item
    async deleteItem(item_id) {
      try {
        await deleteItem(item_id);
        this.fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error.message);
        alert('Failed to delete the item. Please try again.');
      }
    },

    // Change the current page for pagination
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}

button {
  margin: 0 5px;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 10px;
}
</style>
