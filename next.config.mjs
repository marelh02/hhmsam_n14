/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // # WalletConnect related env vars
    SKIP_PREFLIGHT_CHECK: "true",
    NEXT_PUBLIC_PROJECT_ID: "8481362cd2571b0795f0f26a0576c195",
    DAPP_NAME: "HHMSAM",
    DAPP_URL: "http://localhost:3000/",
    DAPP_DESCRIPTION: "Some description about MS app",
    HEDERA_NETWORK: "testnet",
    DAPP_CLIENT_ACCOUNT_ID: "0.0.3642918",
DAPP_CLIENT_PRIVATE_KEY:"3030020100300706052b8104000a04220420a1672dc040e458375559dcbdfba8949dce804b29954eb6cbf3436201c55b6b64"
  },
};

export default nextConfig;
