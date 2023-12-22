'use client';

import { Copy, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CardWithList } from '@/types';

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  return (
    <div className='mt-2 space-y-2'>
      <p className='text-semibold text-xs'>Actions</p>
      <Button
        variant='gray'
        className='w-full justify-start'
        size='inline'
      >
        <Copy className='mr-2 h-4 w-4' />
        Copy
      </Button>
      <Button
        variant='gray'
        className='w-full justify-start'
        size='inline'
      >
        <Trash className='mr-2 h-4 w-4' />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='mt-2 space-y-2'>
      <Skeleton className='h-4 w-20 bg-neutral-200' />
      <Skeleton className='h-8 w-full bg-neutral-200' />

      <Skeleton className='h-8 w-full bg-neutral-200' />
    </div>
  );
};
