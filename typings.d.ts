export interface CommentType {
  _createdAt: string
  _id: string
  _updatedAt: string
  approved: boolean
  comment: string
  email: string
  name: string
  post: object
}

export interface BlogType {
  _id: string
  title: string
  description: string
  author: {
    name: string
    image: { asset: { _ref: string } }
  }
  body: [object]
  mainImage: object
  comments: [CommentType]
  slug: { current: string }
  _createdAt: string
  _updatedAt: string
}
