import { Input } from '@/components/ui/input';

export const FormInput = ({ errors }: { errors?: string[] }) => {
  return (
    <div className='flex flex-col space-y-2'>
      <Input
        id='title'
        name='title'
        required
        placeholder='Enter a board title'
        className='border border-black p-1'
      />
      {errors?.map((error: string) => (
        <p
          key={error}
          className='text-rose-500'
        >
          {error}
        </p>
      ))}
    </div>
  );
};
