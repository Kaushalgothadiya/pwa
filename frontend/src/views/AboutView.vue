<script setup>
import { Tooltip} from 'frappe-ui';

</script>
<template>
  <div class="about">
    <h1 class="text-red-500">This is an about page</h1>
    <Tooltip
    text="disabled tooltip"
    :disabled="true"
    :hover-delay="1"
    :placement="'top'"
  >
    <Button theme="red">
      Delete
    </Button>
  </Tooltip>
  </div>
</template>