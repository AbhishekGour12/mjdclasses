import { useState, useEffect } from "react";
import { videoAPI } from "@/app/lib/Video";
import toast from "react-hot-toast";

export const useVideoFilter = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (customFilters = filters) => {
    try {
      setLoading(true);
      const res = await videoAPI.getAllVideos(customFilters);
      setVideos(res.data || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [filters]);

  return {
    filters,
    setFilters,
    videos,
    loading,
    refetch: fetchVideos, // manual refresh if needed
  };
};
