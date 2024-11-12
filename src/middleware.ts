import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function  middleware(req: NextRequest) {
  console.log("Entrando a Middleware")
  const session =  await getToken({req, secret:  process.env.NEXTAUTH_SECRET})
  console.log(session)
  if(!session){
    const requestedPage =  req.nextUrl.pathname;
    const url =  req.nextUrl.clone();
    url.pathname = "/"
    url.search = `p=${requestedPage}`;
    console.log("Redireccionando a Login")
    return NextResponse.redirect("http://localhost:3001/")
  }

  if(session?.role === 'user'){
    console.log("Redireccionando a HomeUser")
    return NextResponse.redirect("http://localhost:3001/homeUser")
  }
  console.log("Redireccionando a HomeAdmin")
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/home/:path*',
}