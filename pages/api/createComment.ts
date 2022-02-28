// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sanityClient from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-03-25',
}

const client = sanityClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const { _id, name, email, comment } = req.body
  try {
    if (method === 'POST') {
      await client.create({
        _type: 'comment',
        post: {
          _type: 'reference',
          _ref: _id,
        },
        name,
        email,
        comment,
      })
    } else {
      return res.status(500).json({ message: 'Method not allowed!' })
    }
  } catch (err) {
    console.log(err)

    return res.status(500).json({ message: 'Comment not created!' })
  }
  res.status(200).json({ message: 'Comment created' })
}
