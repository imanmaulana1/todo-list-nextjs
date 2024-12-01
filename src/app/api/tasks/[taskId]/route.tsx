import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
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
    const prismaError = error as Prisma.PrismaClientKnownRequestError;

    if (prismaError.code === 'P2025') {
      return NextResponse.json(
        {
          message: 'Task not found.',
        },
        { status: 404 }
      );
    }

    console.error('Error fetching task:', error);
    return NextResponse.json(
      {
        message: 'Failed to retrieve task.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const taskId = Number((await params).taskId);
  const { taskName, status } = await request.json();

  if (isNaN(taskId)) {
    return NextResponse.json(
      {
        message: 'Invalid task ID.',
      },
      { status: 400 }
    );
  }

  if ((taskName && taskName.length < 3) || taskName.length > 50) {
    return NextResponse.json(
      {
        message:
          'Task name must be at least 3 characters and at most 50 characters.',
      },
      { status: 400 }
    );
  }

  if (status && typeof status !== 'boolean') {
    return NextResponse.json(
      {
        message: 'Invalid status. It must be boolean.',
      },
      {
        status: 400,
      }
    );
  }

  try {
    const task = await prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        taskName,
        status,
      },
    });

    return NextResponse.json({
      message: 'Task updated successfully.',
      data: task,
    });
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;

    if (prismaError.code === 'P2025') {
      return NextResponse.json(
        {
          message: 'Task not found.',
        },
        { status: 404 }
      );
    }

    console.error('Error updating task:', error);
    return NextResponse.json(
      {
        message: 'Failed to update task.',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    const task = await prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json({
      message: 'Task deleted successfully.',
      data: task,
    });
  } catch (error) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;

    if (prismaError.code === 'P2025') {
      return NextResponse.json(
        {
          message: 'Task not found.',
        },
        { status: 404 }
      );
    }

    console.error('Error deleting task:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete task.',
      },
      { status: 500 }
    );
  }
}
