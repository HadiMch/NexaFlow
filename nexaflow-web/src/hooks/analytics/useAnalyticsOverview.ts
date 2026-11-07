import { useEffect, useState } from "react";
import { analyticsService } from "../../services/analyticsService";
import type { AnalyticsOverview } from "../../types/analytics";

export function useAnalyticsOverview() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadOverview() {
      if (!active) return;

      setLoading(true);
      setError("");

      try {
        const result = await analyticsService.getOverview();

        if (active) {
          setOverview(result);
        }
      } catch {
        if (active) {
          setOverview(null);
          setError("Failed to load analytics overview.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(() => {
      void loadOverview();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [refreshKey]);

  function retryOverview() {
    setRefreshKey((current) => current + 1);
  }

  return {
    overview,
    loading,
    error,
    retryOverview,
  };
}
