import Link from 'next/link';
import React, { FC } from 'react';
import { urlFor } from '../../../sanity';
import { BlogType } from '../../../typings';

interface Props {
    posts: [BlogType];
}

const RecentPosts: FC<Props> = ({ posts }) => {
    return (
        <div className="max-w-7xl mx-auto p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {
                    posts.map(post => (
                        <div key={post?._id} className="group rounded-md shadow overflow-hidden cursor-pointer">
                            <Link href={`/blog/${post?.slug?.current}`}>
                                <a className="block aspect-video overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200 ease-in-out"
                                        src={urlFor(post?.mainImage)?.url()!}
                                        alt={post?.title} />
                                </a>
                            </Link>
                            <div className="flex justify-between items-center gap-5 px-4 py-3">
                                <div className="">
                                    <p className="font-bold text-lg">{post?.title}</p>
                                    <p className="text-xs">{post?.description} by {post?.author?.name}</p>
                                </div>
                                <div className="w-12 h-12 overflow-hidden rounded-full">
                                    <img src={urlFor(post?.author?.image)?.width(60)?.url()!} alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default RecentPosts;