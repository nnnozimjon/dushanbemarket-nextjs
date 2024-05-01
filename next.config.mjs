/** @type {import('next').NextConfig} */
import svg from '@neodx/svg/webpack'

const nextConfig = {
    webpack: (config, { isServer }) => {
        // Prevent doubling svg plugin, let's run it only for client build
        if (!isServer) {
          config.plugins.push(
            svg({
              group: true,
              root: 'src/assets/icons',
              output: 'public',
              fileName: `{name}.svg`,
            })
          );
        }
        return config;
      }
};

export default nextConfig;
