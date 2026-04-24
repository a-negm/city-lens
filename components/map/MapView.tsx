"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

const BERLIN_CENTER: [number, number] = [13.405, 52.52];
const DEFAULT_ZOOM = 10;
const STYLE_URL = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const DISTRICTS_SOURCE_ID = "berlin-districts";
const DISTRICTS_FILL_LAYER_ID = "berlin-districts-fill";
const DISTRICTS_LINE_LAYER_ID = "berlin-districts-line";
const DISTRICTS_DATA_URL = "/data/berlin-districts.geojson";
const SELECTED_FILL_COLOR = "#cbd5e1";

type SelectedDistrict = {
  id: string;
  name: string;
} | null;

type ActiveLayer =
  | "density"
  | "airQuality"
  | "greenSpace";

type MapViewProps = {
  activeLayer: ActiveLayer | null;
  defaultFillColors: Record<string, string>;
  layerFillColors: Record<ActiveLayer, Record<string, string>>;
  onDistrictSelect?: (district: SelectedDistrict) => void;
  onResetLayer?: () => void;
};

function getFillColorExpression(
  activeLayer: ActiveLayer | null,
  defaultFillColors: Record<string, string>,
  layerFillColors: Record<ActiveLayer, Record<string, string>>,
  selectedDistrictId: string | null,
) {
  const activeFillColors = activeLayer
    ? layerFillColors[activeLayer]
    : defaultFillColors;
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

function getFillOpacityExpression(selectedDistrictId: string | null) {
  return [
    "case",
    ["==", ["get", "Schluessel_gesamt"], selectedDistrictId ?? ""],
    0.75,
    0.45,
  ] as const;
}

export default function MapView({
  activeLayer,
  defaultFillColors,
  layerFillColors,
  onDistrictSelect,
  onResetLayer,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const districtClickHandledRef = useRef(false);
  const onDistrictSelectRef = useRef(onDistrictSelect);
  const onResetLayerRef = useRef(onResetLayer);
  const selectedDistrictIdRef = useRef<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    onDistrictSelectRef.current = onDistrictSelect;
  }, [onDistrictSelect]);

  useEffect(() => {
    onResetLayerRef.current = onResetLayer;
  }, [onResetLayer]);

  useEffect(() => {
    selectedDistrictIdRef.current = selectedDistrictId;
  }, [selectedDistrictId]);

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
        const nextDistrictId = String(districtId);
        districtClickHandledRef.current = true;

        if (selectedDistrictIdRef.current === nextDistrictId) {
          setSelectedDistrictId(null);
          onDistrictSelectRef.current?.(null);
          return;
        }

        if (typeof districtName === "string" && districtName.length > 0) {
          setSelectedDistrictId(nextDistrictId);
          onDistrictSelectRef.current?.({
            id: nextDistrictId,
            name: districtName,
          });
        }
      }
    };

    const handleMapClick = () => {
      if (districtClickHandledRef.current) {
        districtClickHandledRef.current = false;
        return;
      }

      setSelectedDistrictId(null);
      onDistrictSelectRef.current?.(null);
      onResetLayerRef.current?.();
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
          "fill-color": getFillColorExpression(
            activeLayer,
            defaultFillColors,
            layerFillColors,
            selectedDistrictId,
          ),
          "fill-opacity": getFillOpacityExpression(selectedDistrictId),
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
      map.on("click", handleMapClick);
    };

    mapRef.current.on("load", handleLoad);

    return () => {
      const map = mapRef.current;

      if (map) {
        map.off("load", handleLoad);

        if (map.getLayer(DISTRICTS_FILL_LAYER_ID)) {
          map.off("click", DISTRICTS_FILL_LAYER_ID, handleDistrictClick);
        }

        map.off("click", handleMapClick);

        map.remove();
      }

      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !map.getLayer(DISTRICTS_FILL_LAYER_ID)) {
      return;
    }

    map.setPaintProperty(
      DISTRICTS_FILL_LAYER_ID,
      "fill-color",
      getFillColorExpression(
        activeLayer,
        defaultFillColors,
        layerFillColors,
        selectedDistrictId,
      ),
    );

    map.setPaintProperty(
      DISTRICTS_FILL_LAYER_ID,
      "fill-opacity",
      getFillOpacityExpression(selectedDistrictId),
    );
  }, [activeLayer, defaultFillColors, layerFillColors, selectedDistrictId]);

  return (
    <div
      ref={containerRef}
      aria-label="Interactive map of Berlin"
      className="h-full w-full"
    />
  );
}
