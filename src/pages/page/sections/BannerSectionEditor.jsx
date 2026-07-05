/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FiUpload, FiLink } from "react-icons/fi";

const initialState = {
  title: "",
  subtitle: "",
  description: "",
  image: {
    url: "",
    preview: "",
    file: null,
  },
  buttonText: "",
  buttonLink: "",
};

export default function BannerSectionEditor({ section, updateSection }) {
  const [form, setForm] = useState(initialState);

  // ================= LOAD FROM DB =================
  useEffect(() => {
    if (!section?.props) return;

    const img = section.props.image;

    setForm({
      ...initialState,
      ...section.props,
      image: {
        url: img?.url || "",
        preview: img?.url || "",
        file: null,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section?.id]);

  // ================= UPDATE =================
  const handleChange = (key, value) => {
    const updated = { ...form, [key]: value };

    setForm(updated);

    updateSection(section.id, updated);
  };

  // ================= IMAGE =================
  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    handleChange("image", {
      url: "",
      preview,
      file,
    });
  };

  const imageSrc = form.image?.file ? form.image.preview : form.image?.url;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-5 rounded-xl border">
      {/* ================= FORM ================= */}
      <div className="space-y-4">
        <input
          className="border p-3 w-full rounded-lg"
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <input
          className="border p-3 w-full rounded-lg"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
        />

        <textarea
          rows={4}
          className="border p-3 w-full max-h-20 rounded-lg resize-none"
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        {/* ================= IMAGE ================= */}
        <input
          type="file"
          hidden
          id={`img-${section.id}`}
          onChange={handleImage}
        />

        <label
          htmlFor={`img-${section.id}`}
          className="flex items-center justify-center gap-2 border border-dashed px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
        >
          <FiUpload className="text-lg" />
          <span>Upload Image</span>
        </label>

        {/* ================= BUTTON TEXT ================= */}
        <input
          className="border p-3 w-full rounded-lg"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={(e) => handleChange("buttonText", e.target.value)}
        />

        {/* ================= BUTTON LINK ================= */}
        <div className="relative">
          <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            className="border p-3 pl-10 w-full rounded-lg"
            placeholder="https://example.com"
            value={form.buttonLink}
            onChange={(e) => handleChange("buttonLink", e.target.value)}
          />
        </div>
      </div>

      {/* ================= PREVIEW ================= */}
      <div className="border rounded-xl overflow-hidden bg-gray-50">
        {imageSrc ? (
          <img src={imageSrc} className="w-full h-64 object-cover" />
        ) : (
          <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        <div className="p-5 space-y-3">
          <div>
            <h2 className="text-2xl font-bold">
              {form.title || "Banner Title"}
            </h2>

            <p className="text-gray-600">
              {form.subtitle || "Banner subtitle"}
            </p>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            {form.description || "Banner description preview"}
          </p>

          {/* ================= BUTTON PREVIEW ================= */}
          {form.buttonText && (
            <Button className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
              {form.buttonText}
            </Button>
          )}

          <p className="bg-white flex items-center text-xs  gap-2 border p-1 rounded-sm">
            {" "}
            <FiLink />   {form.buttonLink}
          </p>
        </div>
      </div>
    </div>
  );
}
