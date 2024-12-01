import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const taskId = Number((await params).taskId);

  if (isNaN(taskId)) {
    return NextResponse.json(
      {
        message: 'Invalid task ID.',
      },
      { status: 400 }
    );
  }

  try {
    const task = await prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          message: 'Task not found.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Task retrieved successfully.',
      data: task,
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      {
        message: 'Failed to retrieve task.',
      },
      { status: 500 }
    );
  }
}
