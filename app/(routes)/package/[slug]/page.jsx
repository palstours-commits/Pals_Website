import PackageDetails from "@/app/components/Container/PackageDetails/PackageDetails";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title,
    description: `Book the ${title} holiday package with Pals Holidays. Explore destinations, itineraries, pricing, and unforgettable travel experiences.`,

    keywords: [
      title,
      "Holiday Package",
      "Travel Package",
      "Pals Holidays",
      "Tour Package",
    ],

    alternates: {
      canonical: `/package/${slug}`,
    },

    openGraph: {
      title,
      description: `Explore the ${title} holiday package with Pals Holidays.`,
      url: `/package/${slug}`,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: `Explore the ${title} holiday package with Pals Holidays.`,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  return <PackageDetails slug={slug} />;
}