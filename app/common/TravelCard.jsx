import Image from "next/image";
const TravelCard = ({ img, title, duration }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden min-w-[220px] h-[300px] cursor-pointer group shadow">
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-4 left-4 text-white">
        <h5 className="font-semibold leading-tight">{title}</h5>
        <p className="text-xs opacity-90">{duration}</p>
      </div>
    </div>
  );
};

export default TravelCard;
