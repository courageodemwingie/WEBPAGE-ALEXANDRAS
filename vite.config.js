import fs from 'node:fs'
import path from 'node:path'
import {defineConfig} from 'vite'

function getHtmlEntries(directory) {
  const entries = []

  function walk(currentDirectory) {
    const items = fs.readdirSync(currentDirectory, {
      withFileTypes: true,
    })

    for (const item of items) {
      const fullPath = path.join(currentDirectory, item.name)

      if (item.isDirectory()) {
        if (
          item.name !== 'node_modules' &&
          item.name !== 'dist'
        ) {
          walk(fullPath)
        }
        continue
      }

      if (item.name === 'index.html') {
        entries.push(fullPath)
      }
    }
  }

  walk(directory)

  return entries
}

const rootDirectory = process.cwd()
const htmlEntries = getHtmlEntries(rootDirectory)

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlEntries,
    },
  },
})