"use client";

import { useEffect, useState } from "react";

let cachedNavigation = null;
let inflightPromise = null;

async function fetchNavigation() {
  if (cachedNavigation) {
    return cachedNavigation;
  }

  if (inflightPromise) {
    return inflightPromise;
  }

  inflightPromise = fetch("/api/navigation")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load navigation data");
      }
      return response.json();
    })
    .then((data) => {
      cachedNavigation = data;
      return data;
    })
    .finally(() => {
      inflightPromise = null;
    });

  return inflightPromise;
}

export function useNavigation() {
  const [navigationData, setNavigationData] = useState(cachedNavigation);
  const [loading, setLoading] = useState(!cachedNavigation);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadNavigation() {
      try {
        const data = await fetchNavigation();

        if (!cancelled) {
          setNavigationData(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load navigation data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadNavigation();

    return () => {
      cancelled = true;
    };
  }, []);

  return { navigationData, loading, error };
}
