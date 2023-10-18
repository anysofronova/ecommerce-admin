import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const billboard = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error)
    return new NextResponse('Interal error', { status: 500 })
  }
}

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { imageUrl, label } = body

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
    if (!imageUrl)
      return new NextResponse('Image URL is required', { status: 400 })
    if (!label) return new NextResponse('Label is required', { status: 400 })
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 })

    const storeById = await prismadb.store.findFirst({
      where: { id: params.storeId, userId }
    })

    if (!storeById) return new NextResponse('Unauthorized', { status: 401 })

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error)
    return new NextResponse('Interal error', { status: 500 })
  }
}
