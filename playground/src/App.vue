<script setup lang="ts">
  import { useCraftUrlBuilder } from '@craft-vue-sdk';
  import { onMounted, ref } from 'vue';

  const data = ref<unknown>()
  const queryEntry = useCraftUrlBuilder('entries')

  const queryHomeUrl = queryEntry.slug('home').section('home').fields('cta').buildUrl('all')

  const queryNewsUrl = ref('')

  function generateNewsUrl() {
    queryNewsUrl.value = queryEntry.section('news').buildUrl('one')
  }

  const queryEntryUrl = useCraftUrlBuilder('entries')
    .slug('news-article-1')
    .section('news')
    .buildUrl('one');

  async function fetchData() {
    try {
      // Fetch to your craft query API endpoint
      const response = await fetch(queryHomeUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${queryEntryUrl}: ${response.statusText}`);
      }

      data.value = await response.json();

      // Check if your data is there
      console.log('Fetched data:', data);
    } catch (error) {
      // Handle your error gracefully
      console.error(`Could not fetch data from ${queryEntryUrl}:`, error);
    }
  }

  onMounted(() => {

      fetchData();
  })
</script>

<template>
  <Suspense>
    <div>
      <h1>Query Home Url</h1>
      <p>{{ queryHomeUrl }}</p>
      <br>
      <pre>
        {{ data }}
      </pre>

      <button @click="generateNewsUrl">generate Url onclick</button>
      <p>{{ queryNewsUrl }}</p>
    </div>
  </Suspense>
</template>
