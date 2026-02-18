import PackageSection from "@/app/components/Container/Packages/PackageSection";
async function page({ params }) {
  const { submenuSlug, zoneSlug } = await params;
  return <PackageSection submenuSlug={submenuSlug} zoneSlug={zoneSlug} />;
}

export default page;
