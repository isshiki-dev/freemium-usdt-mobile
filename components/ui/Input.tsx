import { View, TextInput, Text } from 'react-native';
import { useState } from 'react';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  label,
  icon,
  secureTextEntry,
  autoCapitalize = 'none',
  editable = true,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-4">
      {label && <Text className="text-gray-300 text-sm font-medium mb-2">{label}</Text>}
      <View
        className={`flex-row items-center bg-gray-900/50 border rounded-xl px-4 py-3 ${
          isFocused ? 'border-primary-500' : 'border-gray-700'
        }`}
      >
        {icon && <View className="mr-3">{icon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-white text-base font-mono"
          style={{ fontFamily: 'monospace' }}
        />
      </View>
    </View>
  );
}