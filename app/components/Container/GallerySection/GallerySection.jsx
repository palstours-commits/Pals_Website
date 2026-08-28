"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getGalleryImages } from "../../../store/slice/gallerySlice";
import CustomImage from "@/app/common/Image";
const GallerSection = () => {
    const dispatch = useDispatch();

    const {
        galleryImages,
        imageLoading,
        imagePagination,
    } = useSelector((state) => state.gallery);
    const [selectedImage, setSelectedImage] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;


    useEffect(() => {
        dispatch(
            getGalleryImages({
                page,
                limit,
            })
        );
    }, [dispatch, page]);

    const totalPages = imagePagination?.totalPages || 1;

    const handlePrevious = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            <div className="px-4 md:px-20 py-20">
                <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 -mt-16">
                    {imageLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="mb-4 break-inside-avoid overflow-hidden rounded-lg"
                            >
                                <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />
                            </div>
                        ))
                    ) : galleryImages?.length > 0 ? (
                        galleryImages.map((item, index) => {
                            const imageUrl =
                                item?.url
                            return (
                                <div
                                    key={item?._id || item?.id || index}
                                    className="mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer"
                                    onClick={() => setSelectedImage(imageUrl)}
                                >
                                    <CustomImage
                                        src={imageUrl}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full flex justify-center py-20">
                            <p className="text-gray-500">
                                No gallery images found.
                            </p>
                        </div>
                    )}
                </div>
                {!imageLoading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={page === 1}
                            className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${page === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-black hover:bg-gray-100"
                                }`}
                        >
                            Previous
                        </button>

                        <span className="text-sm font-medium">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${page === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-black hover:bg-gray-100"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-9999 flex items-center justify-center px-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-w-full max-h-[90vh] rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default GallerSection;