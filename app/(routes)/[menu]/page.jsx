import ZoneSection from "@/app/components/Container/ZoneSection/ZoneSection";

export async function generateMetadata({ params }) {
    const { menu } = await params;
    const pageName = menu
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    return {
        title: pageName,
        description: `Explore ${pageName} with Pals Holidays.`,
        alternates: {
            canonical: `/${menu}`,
        },
    };
}

export default async function Page({ params }) {
    const { menu } = await params;
    return <ZoneSection menu={menu} />;
}