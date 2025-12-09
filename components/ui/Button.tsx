import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
}

export function Button({ onPress, children, loading, disabled, variant = 'primary', icon }: ButtonProps) {
  const isDisabled = loading || disabled;

  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={isDisabled} activeOpacity={0.8}>
        <LinearGradient
          colors={isDisabled ? ['#4b5563', '#374151'] : ['#10b981', '#14b8a6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-xl py-4 px-6 flex-row items-center justify-center"
          style={{ opacity: isDisabled ? 0.5 : 1 }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View className="flex-row items-center gap-2">
              {icon}
              <Text className="text-white font-semibold text-base">{children}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      className={`rounded-xl py-3 px-6 flex-row items-center justify-center border ${
        variant === 'secondary' ? 'bg-gray-800 border-gray-700' : 'bg-transparent border-transparent'
      }`}
      style={{ opacity: isDisabled ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color="#9ca3af" />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className="text-gray-300 font-medium">{children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}