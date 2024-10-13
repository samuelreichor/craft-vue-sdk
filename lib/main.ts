import { App } from "vue";
import CraftPage from "./components/CraftPage.vue";
import CraftArea from "./components/CraftArea.vue";
import type { CraftSdkOptions } from "./types";

export { CraftPage, CraftArea };

export * from './composables/useCraftUrlBuilder';
export * from './types';

export const defaultOptions: CraftSdkOptions = {
  baseUrl: 'test.com',
  registerComponents: true,
  debug: false,
}

export const CraftSdk = {
  install(app: App, options: CraftSdkOptions = defaultOptions) {
    if (options.registerComponents) {
      app.component("CraftPage", CraftPage);
      app.component("CraftArea", CraftArea);
    }

    app.provide("CraftSdkOptions", options);

    if (options.debug) {
      console.log("Craft SDK Options:", options);
    }
  }
};