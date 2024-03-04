"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from './components/AdminNav'
import Footer from './components/Footer'
import Container from './components/Container'
import SideNav from './components/SideNav'
import Content from './components/Content'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function AdminPage() {

    const { data: session } = useSession();
    if (!session) redirect('/login');
    if (!session?.user?.role === "admin") redirect("/welcome");

    const [totalUsersData, setTotalUsersData] = useState([]);
    const [totalPostsData, setTotalPostData] = useState([]);

    console.log(totalPostsData);

    const getTotalUsers = async () => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch user.");
            }

            const data = await res.json();
            setTotalUsersData(data.totalUsers);

        } catch(error) {
            console.log("Error loading posts: ", error);
        }
    }

    const getTotalPosts = async () => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch user.");
            }

            const data = await res.json();
            setTotalPostData(data.totalPosts);

        } catch(error) {
            console.log("Error loading posts: ", error);
        }
    }

    useEffect(() => {
        getTotalUsers();
        getTotalPosts();
    }, [])

 
  return (
    <Container>
        <AdminNav session={session} />
            <div className='flex-grow'>
                <div className="container mx-auto">
                    <div className="flex justify-between mt-10">
                        <SideNav />
                        <Content totalUsersData={totalUsersData} totalPostsData={totalPostsData} />
                    </div>
                </div>
            </div>
        <Footer />
    </Container>
  )
}

export default AdminPage
