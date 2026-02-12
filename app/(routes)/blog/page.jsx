import BlogSection from "@/app/components/Container/BlogSection/BlogSection";

async function page({ params }) {
  const { slug } = await params;
  return <BlogSection slug={slug} />;
}

export default page;
