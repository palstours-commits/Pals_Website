import SearchSection from "@/app/components/Container/SearchSection/SearchSection";

async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.query;
  const initialQuery = Array.isArray(query) ? query[0] || "" : query || "";
  return <SearchSection initialQuery={initialQuery} />;
}

export default SearchPage;
