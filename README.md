# Craft Vue SDK

This package is part of the Craft Node Transformer Plugin and serves as a helper for Vue applications. It enables quick access to Craft CMS data within your Vue components.

## Installation

```bash
npm i craft-vue-sdk
```

## Usage
### 1. Add a catch all route 
Set up a catch-all route in your Vue app.

### 2. Add a Mapping Object
Create a mapping object where you map the sectionHandle to a page and the fieldHandle to a Vue component. An example setup might look like this

````javascript
  import PageHome from '~/templates/pages/home.vue';
  import PageNews from '~/templates/pages/news.vue';

  import BlockImageText from '~/templates/blocks/imageText.vue'
  import BlockHeadline from '~/templates/blocks/headline.vue'

  const mapping = { 
    pages: {
      'home': PageHome,
      'news': PageNews,
    },
    components: {
      'imageText': BlockImageText,
      'headline': BlockHeadline,
    }
  };
````

### 3. Fetch Data from Your Craft Node Transformer Endpoint
Fetch the data from your Craft CMS endpoint using the useFetch function:
````javascript
  const route = useRoute()

  const previewToken = route.query.token; 
  const url = `${your Endpoint url}${route.params.slug || 'home'}${previewToken ? ('?token=' + previewToken) : ''}`
  const { data, error } = await useFetch<NonNullable<object>>(() => url);

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`,
    });
  }
````

### 4. Display the Page
Use the CraftPage component to render the fetched page content. Don’t forget to import it!

````javascript
<template>
  <div>
    <CraftPage v-if="data" :config="mapping" :content="data" />
  </div>
</template>
````

### 5. Use CraftArea for Matrix Blocks
To render matrix blocks in your entry, use the CraftArea component. Here’s an example:
````javascript
<script setup lang="ts">
  import { CraftArea } from 'craft-vue-sdk';
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    contentbuilder: {
      type: Object,
      default: () => null,
    },
  })
</script>

<template>
  <div>
    <Headline size="h1" as="h1">{{ props.title }}</Headline>
    <CraftArea v-if="props.contentbuilder" :content="props.contentbuilder"/>
  </div>
</template>
````