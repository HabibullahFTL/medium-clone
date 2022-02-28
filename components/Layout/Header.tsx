import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-between p-5 max-w-7xl mx-auto">
            <div className="flex justify-center items-center">
                <Link href="/">
                    <img src="/medium-logo.png" className="w-44 object-contain cursor-pointer" alt="" />
                </Link>
                <div className="hidden md:inline-flex space-x-5">
                    <Link href="/">
                        <a className="">About</a>
                    </Link>
                    <Link href="/">
                        <a className="">Contact</a>
                    </Link>
                    <Link href="/">
                        <a className="text-white bg-green-600 px-4 py-1 rounded-full">Follow</a>
                    </Link>
                </div>
            </div>
            <div className="text-green-600 space-x-5">
                <Link href="/">
                    <a className="">Sign In</a>
                </Link>
                <Link href="/">
                    <a className="px-4 py-1 rounded-full border border-green-600">Follow</a>
                </Link>
            </div>
        </header>
    );
};

export default Header;