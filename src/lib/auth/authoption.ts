import GoogleProvider from 'next-auth/providers/google';
import { db } from '../db/db';
import { users } from '../db/schema';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET_ID as string,
            async profile(profile, token: any) {
                console.log('profile', profile);
                console.log('tokens', token);

                const reqdata = {
                    fname: profile.given_name,
                    lname: profile.family_name,
                    email: profile.email,
                    provider: 'GOOGLE',
                    externalID: profile.sub,  // FIXED: Changed from `externalId` to `externalID`
                    image: profile.picture,
                    createdAt: new Date(),  // FIX: Ensure createdAt is included if required in schema
                };

                try {
                    const user = await db.insert(users)
                        .values(reqdata)
                        .onConflictDoUpdate({ 
                            target: users.email, 
                            set: reqdata 
                        })
                        .returning();

                    if (!user || user.length === 0) {
                        throw new Error("User insert/update failed");
                    }

                    return {
                        ...reqdata,
                        name: reqdata.fname,
                        id: String(user[0].id),
                        role: user[0].role,
                    };
                } catch (err) {
                    console.error("Error inserting/updating user:", err);
                    return { id: '' };
                }
            },
        }),
    ],
    callbacks: {
        session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
        jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        }
    },
};
