"use client"

import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Container from "./components/Container";
import Vercel from '../../public/vercel.svg'
import { useSession } from 'next-auth/react'

export default function Home() {


  const { data: session } = useSession();

  return (
    <main>
      <Container>
        <Navbar session={session} />
          <div className="flex-grow text-center p-10">
            <h3 className="text-5xl">NextJS Dashboard</h3>
            <p>Become full-stack developer with nextjs</p>
            <div className="flex justify-center my-10">
              <Image src={Vercel} width={300} height={0} alt="Vercel Image" />
            </div>
          </div>
        <Footer />
      </Container>
    </main>
  );
}
