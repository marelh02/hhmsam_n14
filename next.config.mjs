/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // # WalletConnect related env vars
    SKIP_PREFLIGHT_CHECK: "true",
    NEXT_PUBLIC_PROJECT_ID: "8481362cd2571b0795f0f26a0576c195",
    DAPP_NAME: "HHMSAM",
    DAPP_URL: "http://localhost:3000/",
    DAPP_DESCRIPTION: "Some description about MS app",
  },
};

export default nextConfig;
