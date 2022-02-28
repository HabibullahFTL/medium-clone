import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { Banner, RecentPosts } from '../components/SubPages/HomePage'
import { sanityClient } from '../sanity'
import { BlogType } from '../typings'

interface Props {
  posts: [BlogType]
}

const Home: NextPage<Props> = ({ posts }) => {
  console.log(posts);

  return (
    <Layout>
      <Banner />
      <RecentPosts posts={posts} />
    </Layout>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
    title,
    author-> {name, image},
    description, 
    slug,
    body,
    mainImage
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts
    }
  }
}