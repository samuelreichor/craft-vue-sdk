<script setup lang="ts">
  import { useCraftUrlBuilder } from '@craft-vue-sdk';
  import { ref } from 'vue';

  const queryEntry = useCraftUrlBuilder('entries')

  const queryHomeUrl = queryEntry.slug('home').section('home').buildUrl('all')

  const queryNewsUrl= ref('')
  function generateNewsUrl() {
    queryNewsUrl.value = queryEntry.section('news').buildUrl('one') 
  }

  const queryEntryUrl = useCraftUrlBuilder('entries')
    .slug('home')
    .section('home')
    .buildUrl('one');

  try {
    // Fetch to your craft query api endpoint
    const response = await fetch(queryEntryUrl);
    console.log(response)

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${queryEntryUrl}: ${response.statusText}`);
    }

    const data = await response.json();

    // Check if your data is there 
    console.log('Fetched data:', data);
  } catch (error) {
    // Handle your error
    throw new Error(`Could not fetch data from ${queryEntryUrl}`);
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
