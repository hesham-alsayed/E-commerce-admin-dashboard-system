"use client";

import { useEffect, useState } from "react";
import { Link as LinkIcon } from "lucide-react";

const initialState = {
  title: "",
  description: "",
  buttonText: "",
  buttonLink: "",
};

export default function TextSectionEditor({ section, updateSection }) {
  const [form, setForm] = useState(initialState);

  // ================= LOAD =================
  useEffect(() => {
    const check = () => {
      if (!section?.props) return;

      setForm({
        ...initialState,
        ...section.props,
      });
    };
    check();
  }, [section?.id]);

  // ================= UPDATE =================
  const handleChange = (key, value) => {
    const updated = { ...form, [key]: value };

    setForm(updated);
    updateSection(section.id, updated);
  };

  return (
    <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded-xl border">
      {/* ================= LEFT (FORM) ================= */}
      <div className="space-y-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded max-h-20"
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={(e) => handleChange("buttonText", e.target.value)}
        />

        {/* 🔗 LINK INPUT WITH ICON */}
        <div className="relative">
          <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

          <input
            className="border p-2 pl-9 w-full rounded"
            placeholder="Button Link"
            value={form.buttonLink}
            onChange={(e) => handleChange("buttonLink", e.target.value)}
          />
        </div>
      </div>

      {/* ================= RIGHT (PREVIEW) ================= */}
      <div className="border rounded p-6 bg-gray-50">
        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-3">
          {form.title || "Text Title"}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mb-6 whitespace-pre-line">
          {form.description || "Text description will appear here..."}
        </p>

        {/* BUTTON */}
        {form.buttonText && (
          <a
            href={form.buttonLink || "#"}
            className="inline-block bg-black text-white px-4 py-2 rounded hover:opacity-80"
          >
            {form.buttonText}
          </a>
        )}

        {/* 🔗 LINK PREVIEW */}
        {form.buttonLink && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <LinkIcon className="w-4 h-4" />
            <span className="truncate">{form.buttonLink}</span>
          </div>
        )}
      </div>
    </div>
  );
}
