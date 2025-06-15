/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOSTNAME: "localhost",
    APIBASEURL: "http://localhost:3030",
  },
};

export default nextConfig;
