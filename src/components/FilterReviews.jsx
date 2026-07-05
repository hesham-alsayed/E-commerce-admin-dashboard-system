import React from "react";


import { Star, Stars } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

export default function FilterReviews({ value, onChange }) {
  return (
    <div className="border rounded-sm border-gray-200">
      <Select className="text-black" value={value} onValueChange={onChange}>
        <SelectTrigger className="w-50 gap-3   focus:border-0 border border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none">
          <div className="flex items-center gap-8">
            {value ? `${value} Stars` : "Select rating"}
            <Star className="size-5. fill-amber-400 text-amber-400" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem className={"text-black"} value="all">
            All Ratings
          </SelectItem>
          <SelectItem value="5">
            <span className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />5 Stars
            </span>
          </SelectItem>
          <SelectItem value="4">
            <span className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />4 Stars
            </span>
          </SelectItem>
          <SelectItem value="3">
            <span className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />3 Stars
            </span>
          </SelectItem>
          <SelectItem value="2">
            <span className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />2 Stars
            </span>
          </SelectItem>
          <SelectItem value="1">
            <span className="flex items-center gap-2">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />1 Star
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
