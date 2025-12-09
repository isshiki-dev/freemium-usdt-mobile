import { View, Text } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

export function Badge({ children, variant = 'default', icon }: BadgeProps) {
  const variants = {
    default: 'bg-gray-800/50 border-gray-700',
    success: 'bg-primary-500/20 border-primary-500/30',
    warning: 'bg-amber-500/20 border-amber-500/30',
    error: 'bg-red-500/20 border-red-500/30',
  };

  const textVariants = {
    default: 'text-gray-400',
    success: 'text-primary-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
  };

  return (
    <View className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border ${variants[variant]}`}>
      {icon}
      <Text className={`text-sm font-medium ${textVariants[variant]}`}>{children}</Text>
    </View>
  );
}