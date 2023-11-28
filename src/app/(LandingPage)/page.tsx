import Link from 'next/link';
import { Medal } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='font-heading flex flex-col items-center justify-center'>
        <div className='mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm'>
          <Medal />
          No 1 task Management
        </div>
        <h1 className='mb-6 text-center text-3xl text-neutral-800 md:text-6xl'>
          SuperBulletin helps teams move
        </h1>
        <div className='w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 text-3xl text-white md:text-6xl'>
          work forward
        </div>
      </div>
      <div className='font-poppins mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl'>
        Colloaborate, manage projects, and reach new productivity peaks. From
        high risees to the home office, the way your team works is unique -
        accomplish it all with SuperBulletin.
      </div>
      <Button
        className='mt-6'
        size='lg'
        asChild
      >
        <Link href='/sign-up'>Get SuperBulletin for free</Link>
      </Button>
    </div>
  );
}
