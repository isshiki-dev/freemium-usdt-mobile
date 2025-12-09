const API_BASE = 'https://likhonsheikh.xyz/api';

export type AccessTier = 'free' | 'pro' | 'enterprise' | null;

export interface VerificationResult {
  valid: boolean;
  tier: AccessTier;
  expiresAt?: string;
  features?: string[];
  message?: string;
}

export async function verifyKey(key: string): Promise<VerificationResult> {
  try {
    const response = await fetch(`${API_BASE}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
    return await response.json();
  } catch (error) {
    return { valid: false, tier: null, message: 'Connection failed' };
  }
}