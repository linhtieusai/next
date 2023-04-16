import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const googleConfig = {
  clientId: "868808932730-mce503fm76m3j4t11nvfjd5p0mll94dd.apps.googleusercontent.com",
  clientSecret: "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",
  redirectUri: "/",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const session = await getSession({ req });

    // Check if the user is already logged in
    if (session) {
      res.redirect("/");
      return;
    }

    console.log(req.body.credential);

    const client = new OAuth2Client( googleConfig.clientId);



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
        picture: payload?.picture,
      };

    const session = await getSession({ req });


    console.log("nextauth session");

    console.log(session);
    if(session) {
        session.user = userInfo ? userInfo: {};
    }
    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).end('Failed to authenticate with Google');
  }
}
