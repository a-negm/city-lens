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
const GREEN_SPACES_SOURCE_ID = "berlin-green-spaces";
const GREEN_SPACES_LAYER_ID = "berlin-green-spaces-fill";
const GREEN_SPACES_DATA_URL = "/data/berlin-green-spaces.geojson";
const HEAT_STRESS_SOURCE_ID = "berlin-heat-stress";
const HEAT_STRESS_LAYER_ID = "berlin-heat-stress-fill";
const HEAT_STRESS_DATA_URL = "/data/berlin-heat-stress.geojson";

type SelectedDistrict = {
  id: string;
  name: string;
} | null;

type ActiveLayer =
  | "density"
  | "airQuality"
  | "greenSpace"
  | "heatStress";

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
): maplibregl.ExpressionSpecification {
  const activeFillColors =
    activeLayer && activeLayer !== "greenSpace" && activeLayer !== "heatStress"
      ? layerFillColors[activeLayer]
      : defaultFillColors;
  const layerColorExpression: unknown[] = [
    "match",
    ["get", "Schluessel_gesamt"],
  ];

  Object.entries(activeFillColors).forEach(([districtId, color]) => {
    layerColorExpression.push(districtId, color);
  });

  layerColorExpression.push("#6f7c6e");

  return [
    "case",
    ["==", ["get", "Schluessel_gesamt"], selectedDistrictId ?? ""],
    SELECTED_FILL_COLOR,
    layerColorExpression,
  ] as unknown as maplibregl.ExpressionSpecification;
}

function getDistrictFillOpacityExpression(
  activeLayer: ActiveLayer | null,
  selectedDistrictId: string | null,
): maplibregl.ExpressionSpecification {
  return [
    "case",
    ["==", ["get", "Schluessel_gesamt"], selectedDistrictId ?? ""],
    0.75,
    activeLayer === "heatStress" ? 0.08 : 0.45,
  ] as unknown as maplibregl.ExpressionSpecification;
}

function getHeatColorExpression(): maplibregl.ExpressionSpecification {
  return [
    "interpolate",
    ["linear"],
    ["get", "utci"],
    27,
    "#FDE68A",
    30,
    "#F59E0B",
    33,
    "#EA580C",
    36,
    "#DC2626",
    39,
    "#7F1D1D",
  ];
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
  const activeLayerRef = useRef(activeLayer);
  const defaultFillColorsRef = useRef(defaultFillColors);
  const layerFillColorsRef = useRef(layerFillColors);
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
    activeLayerRef.current = activeLayer;
  }, [activeLayer]);

  useEffect(() => {
    defaultFillColorsRef.current = defaultFillColors;
  }, [defaultFillColors]);

  useEffect(() => {
    layerFillColorsRef.current = layerFillColors;
  }, [layerFillColors]);

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

      map.addSource(HEAT_STRESS_SOURCE_ID, {
        type: "geojson",
        data: HEAT_STRESS_DATA_URL,
      });

      map.addLayer({
        id: HEAT_STRESS_LAYER_ID,
        type: "fill",
        source: HEAT_STRESS_SOURCE_ID,
        layout: { visibility: "none" },
        paint: {
          "fill-color": getHeatColorExpression(),
          "fill-opacity": 0.38,
        },
      });

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
            activeLayerRef.current,
            defaultFillColorsRef.current,
            layerFillColorsRef.current,
            selectedDistrictIdRef.current,
          ),
          "fill-opacity": getDistrictFillOpacityExpression(
            activeLayerRef.current,
            selectedDistrictIdRef.current,
          ),
        },
      });

      map.addSource(GREEN_SPACES_SOURCE_ID, {
        type: "geojson",
        data: GREEN_SPACES_DATA_URL,
      });

      // Added after district fill and before district line so parks render
      // above the neutral district fill but boundary lines stay on top.
      map.addLayer({
        id: GREEN_SPACES_LAYER_ID,
        type: "fill",
        source: GREEN_SPACES_SOURCE_ID,
        layout: { visibility: "none" },
        paint: { "fill-color": "#22c55e", "fill-opacity": 0.4 },
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
      getDistrictFillOpacityExpression(activeLayer, selectedDistrictId),
    );

    if (map.getLayer(HEAT_STRESS_LAYER_ID)) {
      map.setLayoutProperty(
        HEAT_STRESS_LAYER_ID,
        "visibility",
        activeLayer === "heatStress" ? "visible" : "none",
      );
    }

    if (map.getLayer(GREEN_SPACES_LAYER_ID)) {
      map.setLayoutProperty(
        GREEN_SPACES_LAYER_ID,
        "visibility",
        activeLayer === "greenSpace" ? "visible" : "none",
      );
    }
  }, [activeLayer, defaultFillColors, layerFillColors, selectedDistrictId]);

  return (
    <div
      ref={containerRef}
      aria-label="Interactive map of Berlin"
      className="h-full w-full"
    />
  );
}
