<script setup>
import { Button, Card, Badge} from 'frappe-ui';
</script>
<template>
    <h1>contact Page</h1>
    <div class="p-4">
    <Card>
      <h2 class="text-xl font-bold">Welcome to Frappe UI 🎉</h2>
      <p class="text-1xl font-bold text-red-500 underline">This is a simple card component using frappe-ui.</p>
      <Badge
        theme="blue"
        size="sm"
        label="Test"
        >
        Badge
        </Badge>
        <Badge
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Badge"
        >
        Black
        </Badge>
      <Button variant="primary">Click Me</Button>
    </Card>
  </div>
  <div>

  </div>
</template>