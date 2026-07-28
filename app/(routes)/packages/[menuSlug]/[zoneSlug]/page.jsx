import PackageSection from "@/app/components/Container/Packages/PackageSection";

export async function generateMetadata({ params }) {
  const { menuSlug, zoneSlug } = await params;

  const menu = menuSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const zone = zoneSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${zone} ${menu}`,
    description: `Discover the best ${zone} ${menu} holiday packages, luxury stays, and unforgettable travel experiences with Pals Holidays.`,

    keywords: [
      zone,
      menu,
      `${zone} ${menu}`,
      "Holiday Packages",
      "Travel",
      "Pals Holidays",
    ],

    alternates: {
      canonical: `/packages/${menuSlug}/${zoneSlug}`,
    },

    openGraph: {
      title: `${zone} ${menu}`,
      description: `Explore ${zone} ${menu} with Pals Holidays.`,
      url: `/${menuSlug}/${zoneSlug}`,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${zone} ${menu}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${zone} ${menu}`,
      description: `Explore ${zone} ${menu} with Pals Holidays.`,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function Page({ params }) {
  const { menuSlug, zoneSlug } = await params;

  return (
    <PackageSection
      menuSlug={menuSlug}
      zoneSlug={zoneSlug}
    />
  );
}