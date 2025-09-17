'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { homePath } from '@/path';

export const deleteChat = async (id: string) => {
  await prisma.chat.delete({
    where: {
      id,
    },
  });

  revalidatePath(homePath());
  redirect(homePath());
};
