import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const status = searchParams.get('status');

  const statusFilter =
    status === 'completed' ? true : status === 'inprogress' ? false : undefined;

  const tasks = await prisma.tasks.findMany({
    where: {
      ...(query && { taskName: { contains: query, mode: 'insensitive' } }),
      ...(statusFilter !== undefined && { completed: statusFilter }),
    },
  });

  return NextResponse.json({
    message: 'Success',
    data: tasks,
  });
}
