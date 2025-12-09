import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Key, ArrowRight, Shield, Zap, Crown, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, Input, Card } from '@/components/ui';
import { AgeGate } from '@/components/AgeGate';
import { verifyKey } from '@/lib/api';
import { saveKey, getKey } from '@/lib/storage';

export default function VerifyScreen() {
  const [hasAcceptedAge, setHasAcceptedAge] = useState(false);
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkInitialState();
  }, []);

  const checkInitialState = async () => {
    try {
      const ageAccepted = await AsyncStorage.getItem('age_verified');
      if (ageAccepted === 'true') {
        setHasAcceptedAge(true);
      }

      const savedKey = await getKey();
      if (savedKey) {
        const result = await verifyKey(savedKey);
        if (result.valid) {
          router.replace('/dashboard');
          return;
        }
      }
    } catch (e) {}
    setChecking(false);
  };

  const handleAgeAccept = async () => {
    await AsyncStorage.setItem('age_verified', 'true');
    setHasAcceptedAge(true);
  };

  const handleVerify = async () => {
    if (!key.trim()) {
      Alert.alert('Error', 'Please enter your access key');
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const result = await verifyKey(key.trim());

    if (result.valid) {
      await saveKey(key.trim());
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/dashboard');
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Invalid Key', result.message || 'Please check your access key');
    }

    setLoading(false);
  };

  if (checking) {
    return (
      <SafeAreaView className="flex-1 bg-gray-950 items-center justify-center">
        <View className="items-center">
          <View className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full" />
          <Text className="text-gray-400 mt-4">Verifying access...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!hasAcceptedAge) {
    return <AgeGate onAccept={handleAgeAccept} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-8"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8">
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.2)', 'rgba(20, 184, 166, 0.2)']}
            className="w-20 h-20 rounded-2xl items-center justify-center mb-6"
            style={{ borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.3)' }}
          >
            <Key color="#10b981" size={40} />
          </LinearGradient>
          <Text className="text-3xl font-bold text-white mb-2">Access Verification</Text>
          <Text className="text-gray-400 text-center">
            Enter your key to unlock premium crypto utilities
          </Text>
        </View>

        <Card className="mb-8">
          <Input
            label="Access Key"
            value={key}
            onChangeText={setKey}
            placeholder="Enter your access key..."
            icon={<Key color="#6b7280" size={20} />}
          />

          <Button onPress={handleVerify} loading={loading} disabled={!key.trim()}>
            Verify Access
          </Button>

          <View className="flex-row items-center gap-2 mt-6 pt-6 border-t border-gray-800">
            <CheckCircle color="#10b981" size={16} />
            <Text className="text-gray-500 text-xs">Server-side verification only</Text>
          </View>
        </Card>

        <View className="flex-row gap-3">
          <TierCard icon={Shield} name="Free" desc="Basic" color="#9ca3af" />
          <TierCard icon={Zap} name="Pro" desc="Enhanced" color="#10b981" />
          <TierCard icon={Crown} name="Enterprise" desc="Full suite" color="#f59e0b" />
        </View>

        <View className="items-center mt-8">
          <Text className="text-gray-500 text-xs">
            <Text className="text-white font-semibold">Freemium</Text>
            <Text className="text-yellow-400"> & </Text>
            <Text className="text-primary-400 font-semibold">Flash</Text>
            <Text className="text-white font-semibold"> USDT</Text> © 2025
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TierCard({ icon: Icon, name, desc, color }: { icon: any; name: string; desc: string; color: string }) {
  return (
    <View className="flex-1 p-4 rounded-xl border items-center" style={{ borderColor: color + '40', backgroundColor: color + '10' }}>
      <Icon color={color} size={24} />
      <Text style={{ color }} className="font-semibold text-sm mt-2">{name}</Text>
      <Text className="text-xs opacity-70" style={{ color }}>{desc}</Text>
    </View>
  );
}