"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function WelcomePage() {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    console.log(session)

    if (session?.user?.role === "admin") redirect("/admin");

    const [postData, setPostData] = useState([]);

    const userEmail = session?.user?.email;

    const getPosts = async () => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/posts?email=${userEmail}`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await res.json();
            setPostData(data.posts);
            console.log(data);

        } catch(error) {
            console.log("Error loading posts: ", error)
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

  return (
    <Container>
        <Navbar session={session} />
            <div className='flex-grow'>
                <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl">
                    <div className="flex justify-between">
                        <div>
                            <h3 className='text-3xl'>Profile</h3>
                            <p>Welcome, {session?.user?.name}</p>
                            <p>Email: {session?.user?.email}</p>
                        </div>
                        <div>
                            <Link className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2' href="/create">
                                Create Post
                            </Link>
                        </div>
                    </div>

                    {/* User Post Data */}
                    <div>

                        {postData && postData.length > 0 ? (
                            postData.map(val => (
                                <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
                                    <h4 className='text-2xl'>{val.title}</h4>
                                    <Image 
                                        className='my-3 rounded-md'
                                        src={val.img}
                                        width={300}
                                        height={0}
                                        alt={val.title}
                                    />
                                    <p>
                                        {val.content}
                                    </p>
                                    <div className='mt-5'>
                                        <Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2' href={`/edit/${val._id}`}>Edit</Link>
                                        <DeleteBtn id={val._id} />
                                        {/* <Link  href={`/delete/${val._id}`}>Delete</Link> */}
                                    </div>
                                </div> 
                            ))
                        ) : (
                            <p className='bg-gray-300 p-3 mt-3'>
                                You do not have any posts yet.
                            </p>
                        )}


                        {/* <div className="shadow-xl my-10 p-10 rounded-xl">
                            <h4 className='text-2xl'>Post Title</h4>
                            <Image 
                                className='my-3 rounded-md'
                                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww"
                                width={300}
                                height={0}
                                alt='My Image'
                            />
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis odio ratione, esse voluptatem exercitationem et voluptas laudantium. Incidunt nam voluptatem cumque dolorum, doloribus in quia similique sunt non, autem veritatis?
                            </p>
                            <div className='mt-5'>
                                <Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2' href="/edit">Edit</Link>
                                <Link className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2' href="/delete">Delete</Link>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        <Footer />
    </Container>
  )
}

export default WelcomePage
