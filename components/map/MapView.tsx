"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

const BERLIN_CENTER: [number, number] = [13.405, 52.52];
const DEFAULT_ZOOM = 10;
const STYLE_URL = "https://demotiles.maplibre.org/style.json";
const DISTRICTS_SOURCE_ID = "berlin-districts";
const DISTRICTS_FILL_LAYER_ID = "berlin-districts-fill";
const DISTRICTS_LINE_LAYER_ID = "berlin-districts-line";
const DISTRICTS_DATA_URL = "/data/berlin-districts.geojson";

export default function MapView() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: BERLIN_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      const map = mapRef.current;

      if (!map || map.getSource(DISTRICTS_SOURCE_ID)) {
        return;
      }

      map.addSource(DISTRICTS_SOURCE_ID, {
        type: "geojson",
        data: DISTRICTS_DATA_URL,
      });

      map.addLayer({
        id: DISTRICTS_FILL_LAYER_ID,
        type: "fill",
        source: DISTRICTS_SOURCE_ID,
        paint: {
          "fill-color": "#6f7c6e",
          "fill-opacity": 0.16,
        },
      });

      map.addLayer({
        id: DISTRICTS_LINE_LAYER_ID,
        type: "line",
        source: DISTRICTS_SOURCE_ID,
        paint: {
          "line-color": "#475569",
          "line-width": 1.25,
        },
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Interactive map of Berlin"
      className="h-full min-h-[24rem] w-full"
    />
  );
}
