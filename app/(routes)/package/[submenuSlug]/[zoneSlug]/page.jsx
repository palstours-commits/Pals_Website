import TravelDestination from "@/app/components/Container/Destination/Destination";
async function page({ params }) {
  const { submenuSlug, zoneSlug } = await params;
  return <TravelDestination submenuSlug={submenuSlug} zoneSlug={zoneSlug} />;
}

export default page;
