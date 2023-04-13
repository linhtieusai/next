'use client'

import Link from 'next/link';
import Login from '../../components/Login';
import { useSession } from "next-auth/react";
import  GoogleSignIn  from '../../components/GoogleSignin';
import { useEffect } from 'react';


const MyPage = ({ params })  => {
  const { data: session, status } = useSession();

    return (
      <>
      <h1>My Page</h1>
        <GoogleSignIn onSuccess={() => {}}/>
      </>
    );
};

export default MyPage;