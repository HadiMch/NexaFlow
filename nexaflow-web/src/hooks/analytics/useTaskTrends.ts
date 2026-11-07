import { useEffect, useState } from "react";
import { analyticsService } from "../../services/analyticsService";
import type { AnalyticsPeriod, TaskTrend } from "../../types/analytics";

export function useTaskTrends(days: AnalyticsPeriod) {
  const [trends, setTrends] = useState<TaskTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadTrends() {
      if (!active) return;

      setLoading(true);
      setError("");
      setTrends([]);

      try {
        const result = await analyticsService.getTaskTrends(days);

        if (active) {
          setTrends(result);
        }
      } catch {
        if (active) {
          setError("Failed to load task trends.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(() => {
      void loadTrends();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [days, refreshKey]);

  function retryTrends() {
    setRefreshKey((current) => current + 1);
  }

  return {
    trends,
    loading,
    error,
    retryTrends,
  };
}
