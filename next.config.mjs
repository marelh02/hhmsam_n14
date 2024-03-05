/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // # WalletConnect related env vars
    SKIP_PREFLIGHT_CHECK: "true",
    NEXT_PUBLIC_PROJECT_ID: "67fa41dc18654980785c8b1870418129",
    DAPP_NAME: "HHMSAM",
    DAPP_URL: "https://lark-keen-conversely.ngrok-free.app/",
    DAPP_DESCRIPTION: "Some description about MS app",
  },
};

export default nextConfig;
