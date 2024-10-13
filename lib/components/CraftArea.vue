<script lang="ts" setup>
  import type { Config } from '../types'
  import { inject } from 'vue'
  const props = defineProps({
    content: {
      type: Object,
      required: true,
    }
  })

  const config = inject<Config>('config');

  function getCurrentComponent(component: object) {
    if (!config || !('components' in config)) {
      throw new Error('Configuration is missing or invalid.');
    }

    if (!('type' in component)) {
      throw new Error('props.content has no key named type');
    }

    if (typeof component.type !== 'string') {
      throw new Error('Component type is not a string');
    }

    const cName = component.type;
    
    const componentEl = config.components[cName];
    if (!componentEl) {
      console.error(`No mapped component found for component type: ${cName}`);
      return null;
    }

    return componentEl
  }
</script>

<template>
  <div v-for="(component, index) in props.content" :key="index">
    <component :is="getCurrentComponent(component)" v-bind="component"/>
  </div>
</template>