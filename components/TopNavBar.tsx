'use client'

import Link from 'next/link';
import styles from './Navbar.module.css';
import { useSession } from "next-auth/react";

const Navbar = () => {

  // get session from nextAuth
  const { data: session } = useSession();
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          Home
        </Link>
      </div>
      <div className={styles.mypage}>
        <Link href="/my-page">
          {session ? "My Page" : "Login"}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;