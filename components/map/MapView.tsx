"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

const BERLIN_CENTER: [number, number] = [13.405, 52.52];
const DEFAULT_ZOOM = 10;
const STYLE_URL = "https://demotiles.maplibre.org/style.json";
const DISTRICTS_SOURCE_ID = "berlin-districts";
const DISTRICTS_FILL_LAYER_ID = "berlin-districts-fill";
const DISTRICTS_LINE_LAYER_ID = "berlin-districts-line";
const DISTRICTS_DATA_URL = "/data/berlin-districts.geojson";
const SELECTED_FILL_COLOR = "#1f4d3a";

type SelectedDistrict = {
  id: string;
  name: string;
} | null;

type ActiveLayer =
  | "districts"
  | "density"
  | "area"
  | "airQuality"
  | "greenSpace";

type MapViewProps = {
  activeLayer: ActiveLayer;
  layerFillColors: Record<ActiveLayer, Record<string, string>>;
  onDistrictSelect?: (district: SelectedDistrict) => void;
};

function getFillColorExpression(
  activeLayer: ActiveLayer,
  layerFillColors: Record<ActiveLayer, Record<string, string>>,
  selectedDistrictId: string | null,
) {
  const activeFillColors = layerFillColors[activeLayer];
  const layerColorExpression: (string | ["get", string])[] = ["match", ["get", "Schluessel_gesamt"]];

  Object.entries(activeFillColors).forEach(([districtId, color]) => {
    layerColorExpression.push(districtId, color);
  });

  layerColorExpression.push("#6f7c6e");

  return [
    "case",
    ["==", ["get", "Schluessel_gesamt"], selectedDistrictId ?? ""],
    SELECTED_FILL_COLOR,
    layerColorExpression,
  ] as const;
}

export default function MapView({
  activeLayer,
  layerFillColors,
  onDistrictSelect,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null,
  );

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

    const handleDistrictClick = (
      event: maplibregl.MapLayerMouseEvent & {
        features?: maplibregl.MapGeoJSONFeature[];
      },
    ) => {
      const clickedFeature = event.features?.[0];
      const districtId = clickedFeature?.properties?.Schluessel_gesamt;
      const districtName = clickedFeature?.properties?.Gemeinde_name;

      if (districtId !== undefined && districtId !== null) {
        setSelectedDistrictId(String(districtId));

        if (typeof districtName === "string" && districtName.length > 0) {
          onDistrictSelect?.({
            id: String(districtId),
            name: districtName,
          });
        }
      }
    };

    const handleLoad = () => {
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
          "fill-opacity": 0.28,
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


      map.on("click", DISTRICTS_FILL_LAYER_ID, handleDistrictClick);
    };

    mapRef.current.on("load", handleLoad);

    return () => {
      const map = mapRef.current;

      if (map) {
        map.off("load", handleLoad);

        if (map.getLayer(DISTRICTS_FILL_LAYER_ID)) {
          map.off("click", DISTRICTS_FILL_LAYER_ID, handleDistrictClick);
        }

        map.remove();
      }

      mapRef.current = null;
    };
  }, [onDistrictSelect]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !map.getLayer(DISTRICTS_FILL_LAYER_ID)) {
      return;
    }

    map.setPaintProperty(
      DISTRICTS_FILL_LAYER_ID,
      "fill-color",
      getFillColorExpression(activeLayer, layerFillColors, selectedDistrictId),
    );

    map.setPaintProperty(DISTRICTS_FILL_LAYER_ID, "fill-opacity", [
      "case",
      ["==", ["get", "Schluessel_gesamt"], selectedDistrictId ?? ""],
      0.36,
      0.16,
    ]);
  }, [activeLayer, layerFillColors, selectedDistrictId]);

  return (
    <div
      ref={containerRef}
      aria-label="Interactive map of Berlin"
      className="h-full min-h-[24rem] w-full"
    />
  );
}
