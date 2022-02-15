import React from 'react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="bg-gray-50">
            <h1 className="bg-red-900 text-center text-white text-2xl py-4">Home</h1>
            <nav className="bg-gray-500 flex sm:justify-center space-x-4">
                <Link href="/">
                <button className="rounded-lg px-3 py-2 text-white font-medium hover:bg-slate-100 hover:text-slate-900">Todo List</button>
                </Link>
            </nav>
            <h1 className="font-sans font-bold text-2xl md:text-3xl leading-none mt-24 mb-4 text-center text-gray-700">
    <span className="text-green-500">피아노 커버 모음</span>
            </h1>

            <div className="border border-gray-400">
                <img className="scale-75 w-full bg-cover" src="https://i.ytimg.com/vi/kZUbWBKOw3o/maxresdefault.jpg" onClick="" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center dark:text-white">여자친구 - 열대아(cover)</h5>
                <p className="mb-3 font-normal text-gray-700 text-center dark:text-gray-400">아무것도 입력안함</p>
            </div>
            <br />
            <div className="border border-gray-400">
                <img className="scale-75 w-full bg-cover" src="https://i.ytimg.com/vi/HIbJmTXMdTM/maxresdefault.jpg" />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center dark:text-white">STAYC - ASAP</h5>
                <p className="mb-3 font-normal text-gray-700 text-center dark:text-gray-400">아무것도 입력안함</p>
            </div>
        </div>
        
    )
}