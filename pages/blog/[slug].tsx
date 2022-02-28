import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import PortableText from 'react-portable-text';
import Layout from '../../components/Layout';
import { sanityClient, urlFor } from '../../sanity';
import { BlogType, CommentType } from '../../typings';

interface Props {
    post: BlogType
}

interface IFromInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}

const Blog: FC<Props> = ({ post }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IFromInput>();

    console.log(post);


    const onSubmit = async (data: IFromInput) => {
        axios.post('/api/createComment', data)
            ?.then(res => {
                console.log(res.data);
                setIsSubmit(true);
            })
            ?.catch(err => {
                console.log(err.response);
                setIsSubmit(false);
            })
    }

    return (
        <Layout>
            <main>
                <img
                    className="h-60 w-full object-cover"
                    src={urlFor(post?.mainImage)?.url()}
                    alt="" />
                <article className="max-w-3xl mx-auto">
                    <div className="my-10 px-5">
                        <h1 className="text-3xl font-medium">{post?.title}</h1>
                        <h2 className="text-lg font-medium text-gray-500">{post?.description}</h2>
                        <div className="flex items-center space-x-5 mt-4">
                            <img
                                src={urlFor(post?.author?.image)?.url()}
                                alt=""
                                className="w-10 h-10 rounded-full" />
                            <div className="text-gray-600">
                                <p className=""> Posted by - <span className="text-green-600">{post?.author?.name}</span> </p>
                                <p className="">  Published at -{new Date(post?._createdAt).toLocaleString()} </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-5">
                        <PortableText
                            className=""
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                            content={post?.body}
                            serializers={{
                                h1: (props: any) => <h1 className="text-2xl font-bold my-5">{props.children}</h1>,
                                h2: (props: any) => <h2 className="text-xl font-bold my-5">{props.children}</h2>,
                                li: (props: any) => <li className="ml-5 list-disc">{props.children}</li>,
                                link: (props: any) => <a href={props.href} className="text-blue-500 hover:underline">{props.children}</a>,
                            }} />
                    </div>
                </article>

                <hr className="border-yellow-500 max-w-xl mx-auto my-10" />
                {
                    isSubmit
                        ? (
                            <div className="bg-yellow-500 max-w-3xl space-y-5 mx-auto px-5 py-10 mb-5">
                                <h1 className="text-3xl font-medium">Thank you for your comment</h1>
                                <p className="text-gray-600">Your comment will be published after approval</p>
                            </div>
                        )
                        : (
                            <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-5 mx-auto px-5">
                                <div className="">
                                    <h4 className="text-sm text-yellow-600">Enjoyed this article?</h4>
                                    <h1 className="text-3xl font-bold">Leave a comment</h1>
                                </div>
                                <input {...register("_id")} type="hidden" name="_id" value={post._id} />
                                <label className="block space-y-2">
                                    <span className="block font-bold">Name</span>
                                    <input {...register("name", { required: true })} type="text" className="block w-full max-w-lg border border-gray-300 outline-none shadow rounded p-1" />
                                </label>

                                <label className="block space-y-2">
                                    <span className="block font-bold">Email</span>
                                    <input {...register("email", { required: true })} type="text" className="block w-full max-w-lg border border-gray-300 outline-none shadow rounded p-1" />
                                </label>

                                <label className="block space-y-2">
                                    <span className="block font-bold">Comment</span>
                                    <textarea {...register("comment", { required: true })} rows={6} className="block w-full max-w-lg border border-gray-300 outline-none shadow rounded p-1" />
                                </label>
                                {
                                    errors.name && <p className="text-red-600 text-sm">- Name is required</p>
                                }
                                {
                                    errors.email && <p className="text-red-600 text-sm">- Email is required</p>
                                }
                                {
                                    errors.comment && <p className="text-red-600 text-sm">- Comment is required</p>
                                }
                                <button type="submit" className="w-full max-w-lg text-white font-medium bg-yellow-500 hover:bg-yellow-600 px-5 rounded-[2px] py-2">Submit</button>
                            </form>
                        )
                }
                <div className="max-w-3xl mx-auto px-5 mt-5 ">
                    <div className="max-w-lg py-5 mb-5">
                        <div className=" shadow shadow-yellow-500 px-5">
                            <h1 className="text-3xl font-medium">Comments</h1>
                            <hr className="" />
                            {
                                post?.comments?.map((comment: CommentType) => (
                                    <div key={comment._id} className="mt-2 border-b">
                                        <p className="">
                                            <span className="text-yellow-500">Name: </span> {comment.name}
                                        </p>
                                        <p className="">
                                            <span className="text-yellow-500">Comment: </span> {comment.comment}
                                        </p>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Blog;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type=="post" && slug.current == "${params?.slug}"][0]{
        _id,
        _createdAt,
        title,
        author-> {name, image},
        'comments': *[
            _type=="comment" && 
            post._ref == ^._id &&
            approved == true
          ],
        description, 
        slug,
        body,
        mainImage
    }`;

    const post = await sanityClient.fetch(query);
    return {
        props: {
            post
        },
        revalidate: 60, // it will revalidate after 60 seconds
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const query = `*[_type=="post"]{
        _id,
        slug{current}
      }`;

    const posts = await sanityClient.fetch(query);
    const paths = posts?.map((post: BlogType) => ({ params: { slug: post?.slug?.current } }));
    return {
        paths,
        fallback: 'blocking'
    }
}