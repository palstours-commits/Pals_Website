import MainLayout from "@/app/common/MainLayout";
import bannerimg from "@/app/assets/detailsBanner.svg";
import Link from "next/link";
import travel1 from "@/app/assets/travelimg1.svg";
import travel2 from "@/app/assets/travelimg2.svg";
import travel3 from "@/app/assets/travelimg3.svg";
import travel4 from "@/app/assets/travelimg4.svg";
import travel5 from "@/app/assets/travelimg5.svg";
import travel6 from "@/app/assets/travelimg6.svg";
import TravelCard from "@/app/common/TravelCard";

const travelCards = [
  {
    title: "Heritage Of South India",
    days: "12 Nights / 13 Days",
    img: travel1,
  },
  {
    title: "Charming South India",
    days: "6 Nights / 7 Days",
    img: travel2,
  },
  {
    title: "Chennai Shopping",
    days: "3 Nights / 4 Days",
    img: travel3,
  },
  {
    title: "Enchanting Tamilnadu",
    days: "8 Nights / 9 Days",
    img: travel4,
  },
  {
    title: "Highlights of South India",
    days: "5 Nights / 6 Days",
    img: travel5,
  },
  {
    title: "Authentic Homestays",
    days: "4 Nights / 5 Days",
    img: travel6,
  },
];

const TravelDetails = ({ slug }) => {
  const title = slug?.replace(/-/g, " ");

  return (
    <MainLayout>
      <div
        className="relative w-full h-[321px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bannerimg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white px-4">
          <p className="text-sm mb-3  space-x-2">
            <Link href="/" className=" opacity-80">
              Home
            </Link>
            <span>/</span>
            <Link href="/packages" className=" opacity-80">
              India Holidays
            </Link>
            <span>/</span>
            <span className="capitalize text-white">{title}</span>
          </p>
          <h3 className="text-3xl md:text-5xl font-bold capitalize">
            Experience the Timeless Beauty of {title}
          </h3>
        </div>
      </div>
      <div className="px-4 md:px-30 py-10 md:py-15">
        <div>
          <h4 className="font-semibold">Feel the Magic of{title} </h4>
          <p className="max-w-lg py-3 text-gray-600 text-xs">
            Discover handpicked destinations, flexible itineraries, and
            unforgettable experiences across India—planned just the way you
            like.
          </p>
        </div>
        <div
          className="
                                flex gap-4 overflow-x-auto
                                md:grid md:grid-cols-3
                                2xl:grid-cols-4
                                md:overflow-visible
                                scrollbar-hide
                            "
        >
          {travelCards?.map((item, i) => (
            <TravelCard
              key={i}
              img={item?.img}
              title={item?.title}
              duration={item?.days}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TravelDetails;
