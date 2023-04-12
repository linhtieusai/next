'use client'

import Link from 'next/link';
import Login from '../../components/Login';
import { useSession } from "next-auth/react";
import  GoogleSignIn  from '../../components/GoogleSignin';

export default function MyPage({ params }) {
  const { data: session, status } = useSession();

    return (
      <>
      <h1>My Page</h1>

        <GoogleSignIn />

      </>
    );
};