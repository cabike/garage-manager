import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      include: {
        photos: true,
        user: {
          select: { id: true, name: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })
    
    return NextResponse.json(cars)
  } catch (error) {
    console.error('Failed to fetch cars:', error)
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const car = await prisma.car.create({
      data: {
        ...body,
        user: {
          connect: { id: body.userId }
        }
      },
      include: {
        photos: true,
        user: {
          select: { id: true, name: true }
        }
      }
    })
    
    return NextResponse.json(car, { status: 201 })
  } catch (error) {
    console.error('Failed to create car:', error)
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 })
  }
}