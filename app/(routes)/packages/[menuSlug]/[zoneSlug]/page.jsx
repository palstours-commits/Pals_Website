import PackageSection from "@/app/components/Container/Packages/PackageSection";

async function page({ params }) {
  const { menuSlug, zoneSlug } = await params;
  return <PackageSection menuSlug={menuSlug} zoneSlug={zoneSlug} />;
}

export default page;
