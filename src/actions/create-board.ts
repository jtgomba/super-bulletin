'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { db } from '@/lib/db';

const CreatBoard = z.object({
  title: z.string(),
});

export async function create(formData: FormData) {
  const { title } = CreatBoard.parse({
    title: formData.get('title'),
  });

  await db.board.create({
    data: {
      title,
    },
  });

  revalidatePath(`/organization/org_2YzTLlcDKEuiUkY1TGG2qu1Npym`);
}
