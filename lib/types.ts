import { DefineComponent } from 'vue';

export type Config = {
    pages: {
      [key: string]: Record<string, DefineComponent>,
    },
    components: {
      [key: string]: Record<string, DefineComponent>,
    }
  }

export type CraftSdkOptions = {
  baseUrl: string
  registerComponents?: boolean
  debug?: boolean
}