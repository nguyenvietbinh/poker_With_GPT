<template>
  <NuxtPage/>
  
</template>


<script setup lang="ts">
async function submit() {
  const res = await $fetch('/api/submit', {
    method: 'post',
    body: JSON.stringify({ message: 'hello' })
  })
  console.log(res);
}
submit()
</script>