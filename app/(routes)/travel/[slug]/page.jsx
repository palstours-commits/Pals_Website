import TravelDetails from "@/app/components/Container/TravelDetails/TravelDetails";
async function page({ params }) {
  const { slug } = await params;
  return <TravelDetails slug={slug} />;
}

export default page;
