import CustomImage from "@/app/common/Image";

const SearchResults = ({ results, loading, error, onSelect }) => {
  if (loading) {
    return (
      <p className="px-5 py-4 text-sm text-gray-500">
        Searching packages...
      </p>
    );
  }

  if (error) {
    return <p className="px-5 py-4 text-sm text-red-600">{error}</p>;
  }

  if (!results?.length) {
    return (
      <p className="px-5 py-4 text-sm text-gray-500">
        No packages found. Try another destination.
      </p>
    );
  }

  return results.map((pkg) => (
    <button
      key={pkg._id}
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onSelect(pkg)}
      className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-red-50 sm:px-5"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
        <CustomImage
          src={pkg.images?.[0]}
          alt={pkg.packageName}
          fill
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">
          {pkg.packageName}
        </p>
        <p className="truncate text-xs text-gray-500">
          {pkg.zoneId?.name}
          {pkg.destinations?.length
            ? ` · ${pkg.destinations.join(", ")}`
            : ""}
        </p>
      </div>
    </button>
  ));
};

export default SearchResults;
