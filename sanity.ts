import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

interface Config {
  dataset: string
  projectId: string
  useCdn: boolean
  apiVersion: string
}

export const config: Config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
}

export const sanityClient = createClient(config)

export const urlFor = (source: object) => imageUrlBuilder(config).image(source)
