'use client';

import { Board } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    //TODO: Focus inputs
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
    console.log('I am submitted', title);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className='flex items-center gap-x-2'
        ref={formRef}
      >
        <FormInput
          id='title'
          onBlur={onBlur}
          defaultValue={data.title}
          className='h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent'
          ref={inputRef}
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      className='h-auto w-auto p-1 px-2 text-lg font-bold'
      variant='transparent'
    >
      {data.title}
    </Button>
  );
};
