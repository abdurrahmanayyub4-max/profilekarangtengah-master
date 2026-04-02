// components/AvatarInitial.tsx
export default function AvatarInitial({
    name,
    size = 'sm',
  }: {
    name: string;
    size?: 'sm' | 'md' | 'lg';
  }) {
    // Ambil inisial dari nama (maks 2 huruf)
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  
    const sizeClass = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-14 h-14 text-lg',
    }[size];
  
    return (
      <div
        className={`${sizeClass} rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white flex-shrink-0`}
      >
        {initials}
      </div>
    );
  }