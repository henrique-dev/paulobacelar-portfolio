const createNextIntlPlugin = require('next-intl/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ];
  // },
  reactStrictMode: false
};

const withNextIntl = createNextIntlPlugin();
module.exports = withNextIntl(nextConfig);
