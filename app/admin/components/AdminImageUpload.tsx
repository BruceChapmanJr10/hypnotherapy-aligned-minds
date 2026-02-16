"use client";

import { CldUploadWidget } from "next-cloudinary";

export default function AdminImageUpload({ onUpload }: any) {
  return (
    <CldUploadWidget
      uploadPreset="aligned_minds_unsigned"
      onSuccess={(result: any) => {
        onUpload(result.info.secure_url);
      }}
    >
      {({ open }) => {
        return (
          <button
            onClick={() => open()}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Upload Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
