import BlogSection from "@/app/components/Container/BlogSection/BlogSection";

export async function generateMetadata({ params }) {
  const slug = params?.slug ?? "";

  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: title || "Blog",
    description: `Read ${title || "our latest blogs"} on Pals Holidays and discover travel tips, destination guides, and holiday inspiration.`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default function Page({ params }) {
  return <BlogSection slug={params?.slug} />;
}