"use client";
import "maplibre-gl/dist/maplibre-gl.css"
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

const BERLIN_CENTER: [number, number] = [13.405, 52.52];
const DEFAULT_ZOOM = 10;
const STYLE_URL = "https://demotiles.maplibre.org/style.json";

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
