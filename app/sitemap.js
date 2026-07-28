const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

async function getPackages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/package/getAllPackages`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data?.data?.packages || [];
}

export default async function sitemap() {
  const packages = await getPackages();

  const packageUrls = packages.map((pkg) => ({
    url: `${BASE_URL}/packages/${pkg.slug}`,
    lastModified: pkg.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...packageUrls,
  ];
}
