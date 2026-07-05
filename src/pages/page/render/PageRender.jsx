"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionsRender from "./SectionsRender";
import { api } from "@/components/ِApi";
import { Loader2 } from "lucide-react";

export default function PageRender() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const { pageId } = useParams();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/pages/${pageId}`);

        setSections(res.data.page.sections || []);
      } catch (err) {
        console.log(err);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      fetchPage();
    }
  }, [pageId]);

  // ================= LOADING =================
  if (loading || !pageId) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {sections.map((sec) => (
        <SectionsRender key={sec._id} section={sec} />
      ))}
    </div>
  );
}
