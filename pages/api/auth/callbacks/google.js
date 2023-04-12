import { google } from 'googleapis';
import { serialize } from 'cookie';

const CLIENT_ID = '868808932730-mce503fm76m3j4t11nvfjd5p0mll94dd.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callbacks/google';
const SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];

export default async (req, res) => {
  try {
    const code = req.query.code;

    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const userInfo = await oauth2.userinfo.get({ auth: oauth2Client });

    // Save the user's email address to the session
    req.session.set('user', { email: userInfo.data.email });
    await req.session.save();

    // Redirect the user to the home page
    res.setHeader('Set-Cookie', serialize('token', tokens.access_token, { path: '/' }));
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(error.response.status || 500).end(error.message);
  }
};
