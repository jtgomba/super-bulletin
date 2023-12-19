'use client';

import { Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { createCard } from '@/actions/create-card';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<'form'>>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} created`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener('keydown', onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string;
      const listId = formData.get('listId') as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className='m01 space-y-4 px-1 py-0.5'
        >
          <FormTextarea
            id='title'
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder='Enter a title for this card...'
            errors={fieldErrors}
          />
          <input
            hidden
            id='listId'
            name='listId'
            value={listId}
            onChange={() => {}}
          />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add card</FormSubmit>
            <Button
              onClick={disableEditing}
              size='sm'
              variant='ghost'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      );
    }

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
