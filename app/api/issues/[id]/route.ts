import { issueSchema } from '@/app/validationSchema';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await request.json();
  const { id } = await params;
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue)
    return NextResponse.json({ message: 'Invalid Request' }, { status: 404 });
  const upadateIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(upadateIssue, { status: 200 });
}
