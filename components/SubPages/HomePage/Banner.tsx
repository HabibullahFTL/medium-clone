import React from 'react';

const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto bg-yellow-500 border-y border-black">
            <div className="flex justify-between items-center">
                <div className="max-w-xl px-5 py-10 lg:py-0">
                    <h1 className=" text-6xl font-serif">
                        <span className="underline decoration-black decoration-4">Medium</span> is a place to write, read and connect</h1>
                    <p className="">It's easy and free to post your thinking on any topic and connect with millions of readers.</p>
                </div>
                <img src="/m-logo.png" alt="" className="hidden md:inline-flex h-32 lg:h-auto" />
            </div>
        </div>
    );
};

export default Banner;