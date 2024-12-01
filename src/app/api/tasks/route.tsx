import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const status = searchParams.get('status');

  const statusFilter =
    status === 'completed' ? true : status === 'inprogress' ? false : undefined;

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        ...(query && { taskName: { contains: query, mode: 'insensitive' } }),
        ...(statusFilter !== undefined && { status: statusFilter }),
      },
    });

    if (tasks.length === 0) {
      return NextResponse.json({
        message: 'No tasks found.',
      });
    }

    return NextResponse.json({
      message: 'Tasks retrieved successfully.',
      data: tasks,
      total: tasks.length,
    });
  } catch (error) {
    console.error(`Error retrieving tasks: ${error}`);
    return NextResponse.json(
      {
        message: `Failed to retrieve tasks.`,
      },
      { status: 500 }
    );
  }
}
