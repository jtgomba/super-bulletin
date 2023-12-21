'use client';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

import { ListWithCards } from '@/types';

import { ListForm } from './list-form';
import { ListItem } from './list-item';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable
        droppableId='lists'
        type='lists'
        direction='horizontal'
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex h-full gap-x-3'
          >
            {orderedData.map((list, index) => {
              return (
                <ListItem
                  key={list.id}
                  index={index}
                  data={list}
                />
              );
            })}
            {provided.placeholder}
            <ListForm />
            <div className='w-1 flex-shrink-0' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
