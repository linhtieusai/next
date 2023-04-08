'use client'

import Link from 'next/link';
import Login from '../../components/Login';
import { useSession } from "next-auth/react";

export default function MyPage({ params }) {
  const { data: session, status } = useSession();

    return (
      <>
      <h1>My Page</h1>
      <h1>{session ? `Welcome ${session.user.email}` : ''}</h1>

        <Login />

      </>
    );
};