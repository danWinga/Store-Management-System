<template>
    <AppNavbar />
    <div class="container mt-4">
      <ItemList />
      <!--<StoreList />
      <TagList :storeId="selectedStoreId" /> -->
    </div>
  </template>
  
  <script>
import AppNavbar from '@/components/AppNavbar.vue';
import ItemList from '@/components/ItemList.vue';
//import StoreList from '@/components/StoreList.vue';
//import TagList from '@/components/TagList.vue';

  
  export default {
    components: {
      AppNavbar,
      ItemList,
      //StoreList,
      //TagList
    },
    data() {
      return {
        selectedStoreId: null // Dynamically set this as needed
      };
    }
  };
  </script>
  