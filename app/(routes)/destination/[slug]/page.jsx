import TravelDestination from "@/app/components/Container/Destination/Destination";
async function page({ params }) {
  const { slug } = await params;
  return <TravelDestination slug={slug} />;
}

export default page;
