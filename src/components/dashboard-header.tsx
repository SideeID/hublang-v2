export function DashboardHeader() {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      <div>
        <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>
          Dashboard
        </h1>
        <p className='text-slate-600 mt-1'>
          Kelola bisnis Anda dengan mudah dan efisien
        </p>
      </div>
    </div>
  );
}
