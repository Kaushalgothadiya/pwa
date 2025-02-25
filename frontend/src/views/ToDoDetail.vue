<template>
<div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Todo Details</h1>
    
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    <p v-if="loading" class="text-gray-600">Loading...</p>

    <div v-if="todo" class="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto border">
      <h2 class="text-xl font-semibold text-gray-700">Name: {{ todo.name }}</h2>
      <p class="text-gray-600"><strong>Status:</strong> {{ todo.status }}</p>
      
      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-700">Description:</h3>
        <div class="bg-gray-100 p-4 rounded-md mt-2 text-gray-800" v-html="todo.description"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const todoName = route.params.id;

// State variables
const todo = ref(null);
const loading = ref(true);
const errorMessage = ref("");
const message=ref(null);

const fetchToDo = async () => {
  try {
    const response = await axios.get("/api/method/pwa.api.api.get_tododoc", {
      params: { name: todoName },
    });
    console.log("response",response.data)
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    var newvar=JSON.stringify(response)
    console.log("---->>>",newvar)
    todo.value = response.data.data;
  } catch (error) {
    errorMessage.value = "Failed to load ToDo: " + error.message;
  } finally {
    loading.value = false;
  }
};

console.log("----------",todo.name)
onMounted(() => {
  fetchToDo();
});
</script>
