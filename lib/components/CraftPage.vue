<script lang="ts" setup>
  import type { Config } from '../types'
  import { provide, PropType } from 'vue'

  const props = defineProps({
    config: {
      type: Object as PropType<Config>,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    }
  })

  function getCurrentSectionHandle(): string {
    if (!props.content) {
      throw new Error('Content is missing.');
    }

    if (!('sectionHandle' in props.content)) {
      throw new Error('props.content has no key named sectionHandle');
    }

    return props.content.sectionHandle;
  }

  function getCurrentPage() {
    const currentSectionHandle = getCurrentSectionHandle();
    if (!currentSectionHandle) {
      throw new Error('Invalid section handle.');
    }

    if (!props.config || !('pages' in props.config)) {
      throw new Error('Configuration is missing or invalid.');
    }

    const pageComponent = props.config.pages[currentSectionHandle];
    if (!pageComponent) {
      console.error(`No mapped page found for page handle: ${currentSectionHandle}`);
      return null;
    }

    return pageComponent;
  }

  provide('config', props.config)
</script>

<template>
  <div>
    <component :is="getCurrentPage()" v-bind="props.content"/>
  </div>
</template>