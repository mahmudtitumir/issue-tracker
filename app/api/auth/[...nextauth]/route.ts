import authOptions from '@/app/auth/authOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

// NextAuth v4 returns a single handler for all HTTP verbs; export it for both GET and POST.
export { handler as GET, handler as POST };
