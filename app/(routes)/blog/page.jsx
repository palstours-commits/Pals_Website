import BlogSection from "@/app/components/Container/BlogSection/BlogSection";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title,
    description: `Read ${title} on Pals Holidays and discover travel tips, destination guides, and holiday inspiration.`,

    alternates: {
      canonical: `/blog/${slug}`,
    },

    openGraph: {
      title,
      description: `Read ${title} on Pals Holidays.`,
      url: `/blog/${slug}`,
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
      description: `Read ${title} on Pals Holidays.`,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  return <BlogSection slug={slug} />;
}