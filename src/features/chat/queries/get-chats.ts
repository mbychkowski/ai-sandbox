import { prisma } from '@/lib/prisma';

export async function getChats() {
  return prisma.chat.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
