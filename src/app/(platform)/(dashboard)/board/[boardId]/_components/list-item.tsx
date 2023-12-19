'use client';

import { ElementRef, useRef, useState } from 'react';

import { ListWithCards } from '@/types';

import { CardForm } from './card-form';
import { ListHeader } from './list-header';

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<ElementRef<'textarea'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className='h-full w-[272px] shrink-0 select-none'>
      <div className='w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md'>
        <ListHeader
          onAddCard={enableEditing}
          data={data}
        />
        <CardForm
          listId={data.id}
          ref={textAreaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};
