/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "_http_common"];
      config.target = "node";
    }

    return config;
  },
};

export default nextConfig;
