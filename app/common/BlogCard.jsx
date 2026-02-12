"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogCard({ item }) {
  return (
    <Link href={`/blog-details/${item.slug}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full rounded-xl overflow-hidden group cursor-pointer"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          <div className="flex justify-between items-end gap-4">
            <h5 className="flex-1 text-lg md:text-xl font-medium leading-snug">
              {item.title}
            </h5>
            <p className="text-xs opacity-80 whitespace-nowrap">{item.date}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
