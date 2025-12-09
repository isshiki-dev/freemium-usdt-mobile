import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'dashed';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const baseStyles = 'rounded-2xl p-6';
  const variantStyles = {
    default: 'bg-gray-900/50 border border-gray-800',
    glass: 'bg-white/5 border border-white/10',
    dashed: 'bg-gray-900/50 border border-dashed border-gray-700',
  };

  return <View className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</View>;
}