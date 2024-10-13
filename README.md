# Craft Vue SDK

This package is part of the Craft Node Transformer Plugin and serves as a helper for Vue applications. It enables quick access to Craft CMS data within your Vue components.

## Installation

```bash
npm i -D craft-vue-sdk
```

Register the plugin on your application (usually in main.ts), add the baseUrl to your craft cms backend

```typescript
import { CraftSdk } from 'craft-vue-sdk';
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(CraftSdk, { 
  baseUrl: 'http://127.0.0.1:55003', 
  debug: false, 
  registerComponents: true 
})

app.mount('#app') 
```

## Usage
### Add a catch all route 
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

### 3. Fetch Data from Your Craft Query API Endpoint
Using the useCraftUrlBuilder composable you can build craft queries. `.buildUrl('one'|'all')` returns the generated url for the query. The preview token gets applied automaticly.
````javascript
import { useCraftUrlBuilder } from 'craft-vue-sdk';

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

## Available Options in useCraftUrlBuilder
Each type of element has its own function for creating element queries, and they each have their own parameters you can set. All element types expose parameters for their custom fields. Right now we support the following elementTypes.

<hr>

### Addresses:
Usage: `useCraftUrlBuilder('addresses')`

#### Available Methods:
<table width="100%">
  <thead>
    <tr>
      <th>Method</th>
      <th>Type</th>
      <th>Builder Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>addressLine1</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>addressLine2</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>addressLine3</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>buildUrl</td>
      <td>'all' | 'one'</td>
      <td>common</td>
    </tr>
    <tr>
      <td>fullName</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>id</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>locality</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>offset</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>orderBy</td>
      <td>string</td>
      <td>common</td>
    </tr>
    <tr>
      <td>organization</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td>common</td>
    </tr>
  </tbody>
</table>

#### Example:
```javascript
const queryUrl = useCraftUrlBuilder('addresses')
  .id(1)
  .limit(5)
  .status('active')
  .offset(2)
  .orderBy('name')
  .addressLine1('123 Main St')
  .locality('Springfield')
  .fullName('John Doe')
  .buildUrl('one');
```

<hr>

### Assets:
Usage: `useCraftUrlBuilder('assets')`

#### Available Methods:

<table width="100%">
  <thead>
    <tr>
      <th>Method</th>
      <th>Type</th>
      <th>Builder Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>buildUrl</td>
      <td>'all' | 'one'</td>
      <td>common</td>
    </tr>
    <tr>
      <td>filename</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>id</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>kind</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>offset</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>orderBy</td>
      <td>string</td>
      <td>common</td>
    </tr>
    <tr>
      <td>site</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>siteId</td>
      <td>number</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td>common</td>
    </tr>
    <tr>
      <td>volume</td>
      <td>string</td>
      <td>specific</td>
    </tr>
  </tbody>
</table>

#### Example:
```javascript
const queryUrl = useCraftUrlBuilder('assets')
  .id(1)
  .limit(5)
  .status('active')
  .offset(2)
  .orderBy('name')
  .volume('images')
  .kind('png')
  .filename('example.png')
  .site('default')
  .siteId(1)
  .buildUrl('all');
```

<hr>

### Entries:
Usage: `useCraftUrlBuilder('entries')`

#### Available Methods:
<table width="100%">
  <thead>
    <tr>
      <th>Method</th>
      <th>Type</th>
      <th>Builder Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>buildUrl</td>
      <td>'all' | 'one'</td>
      <td>common</td>
    </tr>
    <tr>
      <td>id</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>offset</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>orderBy</td>
      <td>string</td>
      <td>common</td>
    </tr>
    <tr>
      <td>postDate</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>section</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>site</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>siteId</td>
      <td>number</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>slug</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td>common</td>
    </tr>
    <tr>
      <td>uri</td>
      <td>string | string[]</td>
      <td>specific</td>
    </tr>
  </tbody>
</table>

#### Example:
```javascript
const queryUrl = useCraftUrlBuilder('entries')
  .id(1)
  .limit(5)
  .status('active')
  .offset(2)
  .orderBy('name')
  .slug('home')
  .section('home')
  .postDate('2023-01-01')
  .site('default')
  .siteId(1)
  .buildUrl('one');
```

<hr>

### Users:
Usage: `useCraftUrlBuilder('Users')`

#### Available Methods:

<table width="100%">
  <thead>
    <tr>
      <th>Method</th>
      <th>Type</th>
      <th>Builder Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>authorOf</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>buildUrl</td>
      <td>'all' | 'one'</td>
      <td>common</td>
    </tr>
    <tr>
      <td>email</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>fullName</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>group</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>groupId</td>
      <td>string</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>hasPhoto</td>
      <td>boolean</td>
      <td>specific</td>
    </tr>
    <tr>
      <td>id</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>offset</td>
      <td>number</td>
      <td>common</td>
    </tr>
    <tr>
      <td>orderBy</td>
      <td>string</td>
      <td>common</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td>common</td>
    </tr>
  </tbody>
</table>

#### Example:
```javascript
const queryUrl = useCraftUrlBuilder('users')
  .id(1)
  .limit(5)
  .status('active')
  .offset(2)
  .orderBy('name')
  .group('admins')
  .email('admin@test.com')
  .fullName('Admin User')
  .hasPhoto(true)
  .buildUrl('all');
```
