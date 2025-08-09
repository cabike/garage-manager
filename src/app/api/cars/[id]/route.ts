import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: params.id },
      include: {
        photos: true,
        parts: true,
        projects: {
          include: {
            tasks: true
          }
        },
        maintenanceItems: {
          orderBy: { dueDate: 'asc' }
        },
        recalls: {
          where: { status: 'OPEN' }
        }
      }
    })
    
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    }
    
    return NextResponse.json(car)
  } catch (error) {
    console.error('Failed to fetch car:', error)
    return NextResponse.json({ error: 'Failed to fetch car' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const car = await prisma.car.update({
      where: { id: params.id },
      data: body,
      include: {
        photos: true,
        user: {
          select: { id: true, name: true }
        }
      }
    })
    
    return NextResponse.json(car)
  } catch (error) {
    console.error('Failed to update car:', error)
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.car.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete car:', error)
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 })
  }
}