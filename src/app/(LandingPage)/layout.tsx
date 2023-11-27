const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full bg-slate-100'>
      <main className='bg-slate-100 pb-20 pt-40'>{children}</main>
    </div>
  );
};

export default LandingLayout;
