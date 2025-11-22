/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**', // allow all YouTube thumbnail paths
      },

        ],
        domains: [
            "images.unsplash.com",
            "images.openai.com",
            "plus.unsplash.com"
        ],
    }
};

export default nextConfig;
