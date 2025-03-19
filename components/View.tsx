"use client"; 
import { useEffect, useState, useRef } from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

interface ViewProps {
  id: string;
}

const View: React.FC<ViewProps> = ({ id }) => {
  const [totalViews, setTotalViews] = useState<number>(0);
  const hasIncremented = useRef(false); // Prevents duplicate increments

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
      if (hasIncremented.current) return; // Prevents double increment
      hasIncremented.current = true;

      try {
        await fetch(`/api/views/${id}`, { method: "POST" });
      } catch (error) {
        console.error("Error updating views:", error);
      }
    };

    fetchViews();
    incrementViews();
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
