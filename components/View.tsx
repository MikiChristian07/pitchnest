"use client"; // Must run on the client side

import { useEffect, useState } from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

interface ViewProps {
  id: string;
}

const View: React.FC<ViewProps> = ({ id }) => {
  const [totalViews, setTotalViews] = useState<number>(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const data = await client.fetch<{ views?: number }>(STARTUP_VIEWS_QUERY, { id });
        setTotalViews(data?.views ?? 0);
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };

    const incrementViews = async () => {
      try {
        await fetch(`/api/views/${id}`, { method: "POST" });
      } catch (error) {
        console.error("Error updating views:", error);
      }
    };

    fetchViews(); // Load initial views
    incrementViews(); // Increment view count in the background
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{totalViews} view{totalViews !== 1 ? "s" : ""}</span>
      </p>
    </div>
  );
};

export default View;
