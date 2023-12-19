'use client';

import { Plus } from 'lucide-react';
import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    return (
      <div className='px-2 pt-2'>
        <Button
          onClick={enableEditing}
          className='h-auto w-full justify-start px-2 py-1 text-sm text-muted-foreground'
          size='sm'
          variant='ghost'
        >
          <Plus className='mr-2 h-2 w-2' />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = 'CardForm';
