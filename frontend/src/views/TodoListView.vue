<template>
  
  <h1 style="text-align: center;"> Todo Lists</h1>
  <div>
    <div style="display: flex;justify-content: flex-end;">
    <Button
      :variant="'subtle'"
      :ref_for="true"
      theme="gray"
      size="sm"
      label="Reload"
      :loading="post.loading"
      :loadingText="'Loading...'"
      :disabled="post.loading"
      :link="null"
      @click="gotolistview"
    >
      + Add Todo
    </Button>
  </div>
  </div>
  <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

  <ListView
    class="h-auto border rounded-md shadow-md p-2"
    :columns="[
      { label: 'Name', key: 'name', width: '200px'},
      // { label: 'Description', key: 'description', width: '300px' },
      { label: 'Status', key: 'status' },
    ]"
    :rows="formattedRows"
    :options="{
    getRowRoute:(row) => ({ name: 'tododetail', params: { id: row.name } }),
    }"
    row-key="name"
  />

  <br>

  <div class="p-1">
  <Button
    :variant="'subtle'"
    :ref_for="true"
    theme="gray"
    size="sm"
    label="Reload"
    :loading="post.loading"
    :loadingText="'Loading...'"
    :disabled="post.loading"
    :link="null"
    @click="reloadData"
  >
    Reload
  </Button>
</div>

  <!-- <Button @click="reloadData" :loading="post.loading"> Reload </Button> -->
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { createResource,ListView,Button } from "frappe-ui";
import { useRouter } from 'vue-router';

const router = useRouter();

// State variables
const errorMessage = ref("");
const post = createResource({
  url: "/api/method/frappe.client.get_list",
  params: {
    doctype: "ToDo",
    fields: JSON.stringify(["name", "status", "description"]),
    order_by:"modified desc",
  },
});

// Fetch data
const reloadData = async () => {
  try {
    await post.fetch();
    console.log("Fetched Data:", post.data); // Debugging API response
  } catch (error) {
    errorMessage.value = "Failed to load data";
    console.error("API Error:", error);
  }
};

console.log("######## window localstorage #######",window.localStorage.csrf_token)
// Define `getRowRoute` for navigation using router-link
console.log("---------------groute ------------")
// const getRowRoute = (row) => (
// console.log("insidde........"),  
// {
//   name: "todo-detail",
//   params: { id: row.name }, // Pass ID as route parameter
// });

// Define `onRowClick` to handle row click actions
const onRowClick = (row) => {
  console.log(`${row.name} was clicked`);
};

// Compute formatted rows dynamically from `post.data.message`
const formattedRows = computed(() => {
  if (!post.data?.message || !Array.isArray(post.data.message)) {
    return [];
  }

  return post.data.message.map((item, index) => ({
    id: index + 1,
    name:item.name,
    // description: item.description || "No Description",
    status: item.status || "Unknown",
  }));
});

// redirect to the create view
const gotolistview = () => {
  router.push('/todo-create'); // Redirect to the /todo-create route
};

// Fetch data once on mount
onMounted(() => {
  reloadData();
});
</script>
