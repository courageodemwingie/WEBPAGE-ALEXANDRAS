import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: '4lpl2sfj',
  dataset: 'production',
  apiVersion: '2026-09-23',
  useCdn: false,
})