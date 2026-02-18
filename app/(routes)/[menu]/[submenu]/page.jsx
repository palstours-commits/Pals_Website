import ZoneSection from "@/app/components/Container/ZoneSection/ZoneSection";

export default async function Page({ params }) {
  const { menu, submenu } = await params;
  return (
    <>
      <ZoneSection menu={menu} submenu={submenu} />
    </>
  );
}
