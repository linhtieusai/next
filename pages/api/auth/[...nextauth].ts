import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Initialize NextAuth

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
        })
    ],
    // callbacks: {
    //   async session(session) {
    //     const data = await getSelectedUser(session.user!.email!);
    //     session.user = data.userData;
    //     return Promise.resolve(session);
    //   },
    // }
})