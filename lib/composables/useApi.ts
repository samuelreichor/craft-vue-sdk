import { inject } from "vue";
import { CraftSdkOptions } from "../types";
import { defaultOptions } from "../main";

export function useCraft(): CraftSdkOptions {
  const options = inject<CraftSdkOptions>('CraftSdkOptions')

  // Return default Options for better unit tests
  if (options === undefined) {
    return defaultOptions;
  }

  return options
}