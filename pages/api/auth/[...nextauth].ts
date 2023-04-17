import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// Initialize NextAuth
import { OAuth2Client } from 'google-auth-library';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'caunoitot',
};


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "6984088107-b74m2a42votop2kk4hrhfosri34r10d3.apps.googleusercontent.com",
            clientSecret: "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",
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        }),

        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          id: "custom-google",
          name: "custom-google",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            credential: { type: 'text' },
          },
          async authorize(credentials, req) {            
            const ticket  = await new OAuth2Client(
              process.env.GOOGLE_CLIENT_ID,
            ).verifyIdToken({
              idToken: credentials?.userCredential,
              audience: process.env.GOOGLE_CLIENT_ID,
            });
      
            const payload = ticket.getPayload();
        
            const userInfo = {
              email: payload?.email,
              name: payload?.name,
            };
      
            if (userInfo) {
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

              // Any object returned will be saved in `user` property of the JWT
              return userInfo;
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
    ],
})