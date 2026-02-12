import BlogDetailsSection from "@/app/components/Container/BlogDetailsSection/BlogDetailsSection";
async function page({ params }) {
  const { slug } = await params;
  return <BlogDetailsSection slug={slug} />;
}

export default page;
