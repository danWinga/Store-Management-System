<template>
    <Navbar />
    <div class="container mt-4">
      <h2>Dashboard</h2>
      <div class="row">
        <div class="col-md-4">
          <ItemList />
        </div>
        <div class="col-md-4">
          <StoreList />
        </div>
        <div class="col-md-4">
          <TagList />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import ItemList from '@/components/ItemList.vue';
  import StoreList from '@/components/StoreList.vue';
  import TagList from '@/components/TagList.vue';
  
  export default {
    components: {
      Navbar,
      ItemList,
      StoreList,
      TagList,
    },
  };
  </script>
  