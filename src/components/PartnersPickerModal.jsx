"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PartnerPickerModal({
  open,
  onClose,
  partners = [],
  onSelect,
}) {
  const [search, setSearch] = useState("");

  const filteredPartners = useMemo(() => {
    return partners.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [partners, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-4 space-y-4 shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Select Partner</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* SEARCH */}
        <Input
          placeholder="Search partner..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LIST */}
        <div className="max-h-60 overflow-y-auto space-y-2">
          {filteredPartners.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No partners found
            </p>
          )}

          {filteredPartners.map((partner) => (
            <div
              key={partner._id}
              onClick={() => onSelect(partner)}
              className="p-3 border rounded-sm cursor-pointer hover:bg-gray-100 transition"
            >
              <p className=" text-sm">{partner.name}</p>
              <p className="text-xs text-gray-500">{partner.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
