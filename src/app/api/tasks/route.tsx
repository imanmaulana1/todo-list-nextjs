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
        ...(statusFilter !== undefined && { isCompleted: statusFilter }),
      },
    });

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

export async function POST(request: NextRequest) {
  const { taskName } = await request.json();

  try {
    if (!taskName) {
      return NextResponse.json(
        {
          message: 'Task name is required.',
        },
        { status: 400 }
      );
    }

    if (taskName && (taskName.length < 3 || taskName && taskName.length > 50)) {
      return NextResponse.json(
        {
          message:
            'Task name must be at least 3 characters and at most 50 characters.',
        },
        { status: 400 }
      );
    }

    const newTask = await prisma.tasks.create({
      data: {
        taskName,
      },
    });
    return NextResponse.json({
      message: 'Task created successfully.',
      data: newTask,
    });
  } catch (error) {
    console.error(`Error creating task: ${error}`);
    return NextResponse.json(
      {
        message: `Failed to create task.`,
      },
      { status: 500 }
    );
  }
}
