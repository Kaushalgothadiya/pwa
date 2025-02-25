
<template>
    <div>
        <h1>Create View</h1>
    </div>
    <div>
        <div class="p-2">
        <FormControl
            :type="'date'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Select Date"
            :disabled="false"
            label="Due Date"
            v-model="duedate"
        />
        </div>
        <div class="p-2">
        <FormControl
            type="autocomplete"
            :options="[
            {
                label: 'Open',
                value: 'Open',
            },
            {
                label: 'Closed',
                value: 'Closed',
            },
            {
                label: 'Cancelled',
                value: 'Cancelled',
            },
            ]"
            size="sm"
            variant="subtle"
            placeholder="Select Status"
            :disabled="false"
            label="Status"
            v-model="selectedStatus"
        />
        </div>
        <div class="p-2">
        <FormControl
            :type="'textarea'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="Enter Description"
            :disabled="false"
            label="Description"
            v-model="description"
        />
        </div>
        <div v-if="errorMessage" class="text-red-500 p-2">
        {{ errorMessage }}
        </div>
        <div class="p-2">
            <button @click="createTodo" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" :disabled="loading">
                {{ loading ? 'Creating...' : 'Create To-Do' }}
            </button>
        </div>
        
    </div>

</template>

<script setup>
import { ref ,computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import FormControl from 'frappe-ui/src/components/FormControl.vue';
import Button from 'frappe-ui/src/components/Button/Button.vue';
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Router instance
const router = useRouter();

// Form data state
const duedate = ref('');
// const status = ref('');
const description = ref('');
const loading = ref(false);
const errorMessage = ref('');

const selectedStatus = ref(null);
const toast = useToast();

// Function to create To-Do via API
const createTodo = async () => {
  loading.value = true;
  errorMessage.value = '';
// Extract only the value
const status = computed(() => selectedStatus.value?.value || '');
const newstatus=status.value
console.log("status..............",status.value,newstatus)
  const newTodo = {
    date: duedate.value,
    status: newstatus || '', 
    description: description.value,
  };

    try {
    const response = await axios.get("/api/method/pwa.api.api.get_csrf_token_local");
    console.log("response for csrf token -------------->>>>",response.data)
    var message=response.data
    var csrfToken=message.message
    console.log("message ..............",message.message)
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    var newvar=JSON.stringify(response)
    console.log("newvar ------->>>>>",newvar)
  } catch (error) {
    errorMessage.value = "Failed to load ToDo: " + error.message;
  }


    try {
      console.log(newTodo)
    const response = await fetch(`/api/method/pwa.api.api.create_tododoc`, {
      method:"POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
        'X-Frappe-CSRF-Token': csrfToken, // Pass CSRF token
      },

      credentials:"include",
    });

    const responseData = await response.json();
    const todoid=responseData.data.name
    console.log("resposndedata--------------",responseData)
    console.log("todo id is ----------===",todoid)
    console.log('To-Do Created:', response.data);
    
    toast.success('To-Do Created Successfully!', {
      timeout: 2000  // This will make the toast stay visible for 2 seconds
    });
    
    // Redirect to the list page after the success message disappears
    setTimeout(() => {
      router.push(`/todo-form/${todoid}`);
    }, 2000);  // 
  } catch (error) {
    console.error('Error creating To-Do:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to create To-Do';
  } finally {
    loading.value = false;
  }
};
</script>