import BlogSection from "@/app/components/Container/BlogSection/BlogSection";

export async function generateMetadata() {
  return {
    title: "Blog",
    description:
      "Read our latest blogs on Pals Holidays and discover travel tips, destination guides, and holiday inspiration.",
    alternates: {
      canonical: "/blog",
    },
  };
}

export default function Page() {
  return <BlogSection />;
}