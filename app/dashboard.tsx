import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import {
  Shield,
  Zap,
  Crown,
  Wallet,
  Send,
  BarChart3,
  Settings,
  Lock,
  CheckCircle,
  LogOut,
  Clock,
} from 'lucide-react-native';

import { Card, Badge } from '@/components/ui';
import { verifyKey, AccessTier, VerificationResult } from '@/lib/api';
import { getKey, removeKey } from '@/lib/storage';

const tierConfig = {
  free: {
    label: 'Free',
    icon: Shield,
    colors: ['#4b5563', '#374151'] as const,
    features: ['Basic wallet tracking', 'Daily limit', 'Community support'],
    locked: ['Analytics', 'Unlimited transfers', 'Priority support', 'API access'],
  },
  pro: {
    label: 'Pro',
    icon: Zap,
    colors: ['#10b981', '#14b8a6'] as const,
    features: ['Wallet tracking', 'Unlimited transfers', 'Analytics', 'Community support'],
    locked: ['Priority support', 'API access'],
  },
  enterprise: {
    label: 'Enterprise',
    icon: Crown,
    colors: ['#f59e0b', '#fb923c'] as const,
    features: ['All features unlocked', 'Priority support', 'Full API access', 'Custom integrations'],
    locked: [],
  },
};

export default function DashboardScreen() {
  const [tier, setTier] = useState<AccessTier>(null);
  const [data, setData] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedKey = await getKey();
    if (!savedKey) {
      router.replace('/');
      return;
    }

    const result = await verifyKey(savedKey);
    if (result.valid) {
      setTier(result.tier);
      setData(result);
    } else {
      await removeKey();
      router.replace('/');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          await removeKey();
          router.replace('/');
        },
      },
    ]);
  };

  if (loading || !tier) {
    return (
      <SafeAreaView className="flex-1 bg-gray-950 items-center justify-center">
        <View className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full" />
      </SafeAreaView>
    );
  }

  const config = tierConfig[tier];
  const TierIcon = config.icon;

  const actions = [
    { icon: Wallet, label: 'Wallet', available: true },
    { icon: Send, label: 'Transfer', available: tier !== 'free' },
    { icon: BarChart3, label: 'Analytics', available: tier !== 'free' },
    { icon: Settings, label: 'Settings', available: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView contentContainerClassName="p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center">
              <TierIcon color="#10b981" size={20} />
            </View>
            <View>
              <Text className="text-white font-bold text-lg">Freemium & Flash USDT</Text>
              <Text className="text-gray-500 text-xs">USDT Sender Beta</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} className="p-2">
            <LogOut color="#9ca3af" size={20} />
          </TouchableOpacity>
        </View>

        {/* Welcome Banner */}
        <LinearGradient
          colors={[...config.colors]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-2xl p-6 mb-6 overflow-hidden"
        >
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-2xl bg-white/20 items-center justify-center">
              <TierIcon color="#fff" size={32} />
            </View>
            <View>
              <Text className="text-2xl font-bold text-white">Welcome Back</Text>
              <Text className="text-white/80">{config.label} access active</Text>
              {data?.expiresAt && (
                <View className="flex-row items-center gap-1 mt-1">
                  <Clock color="rgba(255,255,255,0.6)" size={12} />
                  <Text className="text-white/60 text-xs">
                    Expires: {new Date(data.expiresAt).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View className="flex-row flex-wrap gap-3 mb-6">
          {actions.map(({ icon: Icon, label, available }) => (
            <TouchableOpacity
              key={label}
              disabled={!available}
              onPress={() => available && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              className={`flex-1 min-w-[45%] p-4 rounded-xl border items-center ${
                available ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-900/30 border-gray-800 opacity-50'
              }`}
            >
              <Icon color={available ? '#d1d5db' : '#4b5563'} size={24} />
              <Text className={`text-sm mt-2 ${available ? 'text-gray-400' : 'text-gray-600'}`}>
                {label}
              </Text>
              {!available && <Lock color="#4b5563" size={12} style={{ marginTop: 4 }} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <Card className="mb-4">
          <View className="flex-row items-center gap-2 mb-4">
            <CheckCircle color="#10b981" size={20} />
            <Text className="text-lg font-semibold text-white">Available Features</Text>
          </View>
          {config.features.map((feature) => (
            <View key={feature} className="flex-row items-center gap-3 py-2">
              <View className="w-2 h-2 rounded-full bg-primary-400" />
              <Text className="text-gray-300">{feature}</Text>
            </View>
          ))}
        </Card>

        {config.locked.length > 0 && (
          <Card variant="dashed">
            <View className="flex-row items-center gap-2 mb-4">
              <Lock color="#9ca3af" size={20} />
              <Text className="text-lg font-semibold text-gray-400">Upgrade to Unlock</Text>
            </View>
            {config.locked.map((feature) => (
              <View key={feature} className="flex-row items-center gap-3 py-2">
                <View className="w-2 h-2 rounded-full bg-gray-600" />
                <Text className="text-gray-500">{feature}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* API Status */}
        <View className="flex-row items-center justify-between mt-6 p-4 rounded-xl bg-gray-900/50 border border-gray-800">
          <View className="flex-row items-center gap-3">
            <View className="w-3 h-3 rounded-full bg-primary-400" />
            <Text className="text-sm text-gray-400">API Connected</Text>
          </View>
          <Text className="text-xs text-gray-500 font-mono">likhonsheikh.xyz</Text>
        </View>

        {/* Footer */}
        <View className="items-center mt-6 mb-4">
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