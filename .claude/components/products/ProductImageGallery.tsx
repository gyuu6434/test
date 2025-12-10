'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={images[selectedImage]}
          alt={`${productName} - 이미지 ${selectedImage + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === index
                ? 'border-orange-600 ring-2 ring-orange-200'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} - 썸네일 ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 12vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
