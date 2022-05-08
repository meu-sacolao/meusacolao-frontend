import { default as resolveConfig} from 'tailwindcss/lib/util/resolveConfig'
import defaultConfig from 'tailwindcss/stubs/defaultConfig.stub'

const tailwindConfig = require.resolve('../../tailwind.config.js')

console.log(tailwindConfig)

export const getTailwindConfig = () => {
  resolveConfig([tailwindConfig, defaultConfig])
}