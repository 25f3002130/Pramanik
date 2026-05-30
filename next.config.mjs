/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
