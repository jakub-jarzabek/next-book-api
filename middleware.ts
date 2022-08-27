import { NextRequest,NextResponse } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
const token = request.nextUrl.searchParams.get('api_token')
  if (!token){
     return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url)); 
  }
  try{

  const a = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string))
  }catch(err){

    return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
  }
    return NextResponse.next()
}

export const config = {
  matcher: '/api/books/:path*',
}

