import { prisma } from '@/lib/prisma';

export async function getChat(id: string) {
  return await prisma.chat.findUnique({
    where: {
      id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
}
