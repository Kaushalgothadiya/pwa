<script setup>
import { FormControl,Button} from 'frappe-ui';

</script>

<template>
  <h1 style="margin-top:10px;text-align:center;"> Leave Form </h1>
  <div class="p-2">
  <FormControl
    type="select"
    :options="[
      {
        label: 'Casual Leave',
        value: '1',
      },
      {
        label: 'Sick Leave',
        value: '2',
      },
      {
        label: 'Earned Leave',
        value: '3',
      },
    ]"
    size="sm"
    variant="subtle"
    placeholder="Placeholder"
    :disabled="false"
    label="Leave Type"
    v-model="selectValue"
  />
</div>
<div class="p-2">
  <FormControl
    :type="'date'"
    :ref_for="true"
    size="sm"
    variant="subtle"
    placeholder="Placeholder"
    :disabled="false"
    label="Date"
    v-model="inputValue"
  />
</div>
<div>
  <div class="p-1">
  <Button
    :variant="'subtle'"
    :ref_for="true"
    theme="gray"
    size="sm"
    label="Button"
    :loading="false"
    :loadingText="null"
    :disabled="false"
    :link="null"
  >
    Button
  </Button>
</div>
</div>
</template>