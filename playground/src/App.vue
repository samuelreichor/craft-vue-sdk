<script setup lang="ts">
  import { useCraftUrlBuilder } from '@craft-vue-sdk';
  import { ref } from 'vue';
  const queryEntry = useCraftUrlBuilder('entries')

  const queryHomeUrl = queryEntry.slug('home').section('home').buildUrl('all')

  const queryNewsUrl= ref('')
  function generateNewsUrl() {
    queryNewsUrl.value = queryEntry.section('news').buildUrl('one') 
  }
</script>

<template>
  <div>
    <h1>Query Home Url</h1>
    <p>
      {{ queryHomeUrl }}
    </p>
    <br>

    <button @click="generateNewsUrl">generate Url onclick</button>
    <p>
      {{ queryNewsUrl }}
    </p>
  </div>
</template>
