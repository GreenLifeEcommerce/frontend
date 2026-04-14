import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com", "placehold.co"],
  },
  // Some reports suggest this top-level key helps next-intl with Turbopack in Next 15
  turbopack: {},
};

export default withNextIntl(nextConfig);
