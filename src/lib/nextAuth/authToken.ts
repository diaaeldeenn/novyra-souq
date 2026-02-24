import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export default async function authToken() {
  const token = await getToken({ 
    req: { cookies: await cookies() } as any,
    secret: process.env.AUTH_SECRET!
  });
  
  return token?.token as string;
}



export async function authUserId() {
  const token = await getToken({ 
    req: { cookies: await cookies() } as any,
    secret: process.env.AUTH_SECRET!
  });
  
  return token?.sub as string;
}