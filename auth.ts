import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
import { User } from "lucide-react"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio }
    }) {
      const exisitingUser = await client.fetch( AUTHOR_BY_GITHUB_ID_QUERY, { 
        id: id
      });

      if (!exisitingUser) {
        await writeClient.create({
          _type: 'author',
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || '',
        });
      }

      return true;
    },

    async jwt ({ token, account, profile }) {
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        })

        token.id = user?._id
      }

      return token;
    },

    async session ({ session, token }) {
      Object.assign(session, { id: token.id });

      return session;
    }
  }
});