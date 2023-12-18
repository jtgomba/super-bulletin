'use client';

import { Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';

import { ListWrapper } from './list-wrapper';

export const ListForm = () => {
  const params = useParams();
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    //execute({ title, id: data.id });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className='w-full space-y-4 rounded-md bg-white p-3 shadow-md'
        >
          <FormInput
            ref={inputRef}
            id='title'
            className='h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input'
            placeholder='Enter list title...'
          />
          <input
            hidden
            value={params.boardId}
            name='boardId'
            onChange={() => {}}
          />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add list</FormSubmit>
            <Button
              onClick={disableEditing}
              size='sm'
              variant='ghost'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50'
      >
        <Plus className='mr-2 h-4 w-4' />
        Add a list
      </button>
    </ListWrapper>
  );
};
