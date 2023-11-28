import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href='/'>
      <div className='hidden items-center gap-x-2 transition hover:opacity-75 md:flex'>
        <Image
          src='/logo.svg'
          alt='Logo'
          height={30}
          width={30}
        />
        <p className='font-heading pt-1 text-lg text-neutral-700'>
          SuperBulletin
        </p>
      </div>
    </Link>
  );
};
