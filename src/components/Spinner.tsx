import { LucideLoaderCircle } from 'lucide-react';

const Spinner = () => {
  return (
    <div
      role="status"
      className="flex-1 self-center flex flex-col items-center justify-center"
    >
      <LucideLoaderCircle className="h-16 w-16 animate-spin" />
    </div>
  );
};

export { Spinner };
