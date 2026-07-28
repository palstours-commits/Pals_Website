import BlogSection from "@/app/components/Container/BlogSection/BlogSection";

export async function generateMetadata() {
  return {
    title: "Blog",
    description: `Read ${title || "our latest blogs"} on Pals Holidays and discover travel tips, destination guides, and holiday inspiration.`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default function Page() {
  return <BlogSection />;
}