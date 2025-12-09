import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ShieldAlert, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { Button, Card } from './ui';

interface AgeGateProps {
  onAccept: () => void;
}

export function AgeGate({ onAccept }: AgeGateProps) {
  const handleAccept = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAccept();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-8">
        <View className="items-center mb-8">
          <LinearGradient
            colors={['rgba(245, 158, 11, 0.2)', 'rgba(251, 146, 60, 0.2)']}
            className="w-20 h-20 rounded-2xl items-center justify-center mb-6"
            style={{ borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.3)' }}
          >
            <ShieldAlert color="#fbbf24" size={40} />
          </LinearGradient>
          <Text className="text-3xl font-bold text-white text-center">
            <Text>Freemium </Text>
            <Text className="text-yellow-400">&</Text>
            <Text className="text-primary-400"> Flash</Text>
            <Text> USDT</Text>
          </Text>
          <Text className="text-gray-400 mt-2">Age Verification Required</Text>
        </View>

        <Card className="mb-6">
          <Text className="text-sm text-gray-300 mb-4">
            This app contains content related to cryptocurrency and financial services.
            By entering, you acknowledge and agree to the following:
          </Text>

          <View className="space-y-2 mb-4">
            {[
              'You are at least 18 years of age or the age of legal majority in your jurisdiction',
              'You understand the risks associated with cryptocurrency transactions',
              'You are accessing this app in compliance with the laws of your jurisdiction',
              'You accept full responsibility for your actions on this platform',
            ].map((item, index) => (
              <View key={index} className="flex-row items-start gap-2 py-1">
                <Text className="text-gray-500">•</Text>
                <Text className="text-gray-400 text-sm flex-1">{item}</Text>
              </View>
            ))}
          </View>

          <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
            <Text className="text-amber-300 text-xs leading-5">
              <Text className="text-amber-400 font-semibold">Important: </Text>
              Cryptocurrency investments carry significant risk. Never invest more than you can afford to lose.
            </Text>
          </View>

          <Button onPress={handleAccept} icon={<ArrowRight color="#fff" size={20} />}>
            I am 18+ years old — Enter
          </Button>

          <Text className="text-xs text-gray-500 text-center mt-4 leading-5">
            By clicking on the 'Enter' button, and by entering this app you agree with all the above
            and certify under penalty of perjury that you are 18+ years of age.
          </Text>
        </Card>

        <View className="items-center">
          <Text className="text-sm text-gray-500">
            <Text className="text-white font-semibold">Freemium</Text>
            <Text className="text-yellow-400"> & </Text>
            <Text className="text-primary-400 font-semibold">Flash</Text>
            <Text className="text-white font-semibold"> USDT</Text>
            <Text> © 2025</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}