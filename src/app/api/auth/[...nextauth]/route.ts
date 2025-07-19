import { authOptions } from "@/lib/auth/authoption";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
