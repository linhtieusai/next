import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import mysql from 'mysql2/promise';

const googleConfig = {
  clientId: "868808932730-mce503fm76m3j4t11nvfjd5p0mll94dd.apps.googleusercontent.com",
  clientSecret: "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",
  redirectUri: "/",
};

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'caunoitot',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ticket  = await new OAuth2Client(
        googleConfig.clientId,
        // googleConfig.clientSecret,
        // googleConfig.redirectUri
      ).verifyIdToken({
        idToken: req.body.credential,
        audience: googleConfig.clientId,
      });

      const payload = ticket.getPayload();
  
      const userInfo = {
        email: payload?.email,
        name: payload?.name,
      };

      const connection = await mysql.createConnection(dbConfig);
      // Check if the user exists in the database
      const [rows] = await connection.execute(
        'SELECT * FROM user WHERE email = ?',
        [userInfo.email]
      );

      if (rows.length === 0) {
        // If the user doesn't exist, insert a new row into the users table
        await connection.execute(
          'INSERT INTO user (email, name) VALUES (?, ?)',
          [userInfo.email, userInfo.name]
        );
      } else {
        // If the user exists, retrieve their information from the users table
        userInfo.name = rows[0].name;
      }

       // Close the database connection
       await connection.end();

  } catch (error) {
    console.error(error);
    res.status(500).end('Failed to authenticate with Google');
  }
}
