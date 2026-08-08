import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import HeroRenderer from "@/components/hero/HeroRenderer";
import {
  DEVICES,
  DEVICE_CANVASES,
  ELEMENT_IDS,
  ELEMENT_LABELS,
  HERO_SLIDES,
  defaultLayoutFor,
  defaultSlideLayouts,
  normaliseLayouts,
  type DeviceKey,
  type ElementId,
  type SlideLayouts,
} from "@/lib/hero-slides";
import {
  amIHeroAdmin,
  listHeroLayouts,
  saveHeroLayout,
} from "@/lib/hero-layouts.functions";

export const Route = createFileRoute("/_authenticated/admin/hero")({
  head: () => ({
    meta: [
      { title: "Hero Design Canvases — Finonest Admin" },
      {
        name: "description",
        content:
          "Design independent Finonest hero layouts for desktop, laptop, tablet and mobile canvases.",
      },
      { property: "og:title", content: "Hero Design Canvases — Finonest Admin" },
      { property: "og:description", content: "Four independent hero design canvases." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HeroEditorPage,
});

const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5];

type Configured = Record<DeviceKey, boolean>;

function HeroEditorPage() {
  const fetchLayouts = useServerFn(listHeroLayouts);
  const checkAdmin = useServerFn(amIHeroAdmin);
  const save = useServerFn(saveHeroLayout);

  const { data: adminData } = useQuery({ queryKey: ["hero-admin"], queryFn: () => checkAdmin() });
  const { data, isLoading } = useQuery({
    queryKey: ["hero-layouts", "editor"],
    queryFn: () => fetchLayouts(),
  });

  const [slideId, setSlideId] = useState(HERO_SLIDES[0].id);
  const [device, setDevice] = useState<DeviceKey>("desktop");
  const [selected, setSelected] = useState<ElementId>("mascot");
  const [zoom, setZoom] = useState(0.5);
  const [store, setStore] = useState<Record<string, SlideLayouts>>({});
  const [configured, setConfigured] = useState<Record<string, Configured>>({});
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);

  // hydrate from the backend once
  useEffect(() => {
    if (!data) return;
    const nextStore: Record<string, SlideLayouts> = {};
    const nextConfigured: Record<string, Configured> = {};
    for (const slide of HERO_SLIDES) {
      const raw = data[slide.id];
      if (raw) {
        const parsed = normaliseLayouts(JSON.parse(raw));
        nextStore[slide.id] = parsed.layouts;
        nextConfigured[slide.id] = parsed.configured;
      } else {
        nextStore[slide.id] = defaultSlideLayouts();
        nextConfigured[slide.id] = { desktop: false, laptop: false, tablet: false, mobile: false };
      }
    }
    setStore(nextStore);
    setConfigured(nextConfigured);
  }, [data]);

  const slide = HERO_SLIDES.find((s) => s.id === slideId)!;
  const layouts = store[slideId];
  const layout = layouts?.[device];
  const canvas = DEVICE_CANVASES[device];

  const markConfigured = useCallback(
    (id: string, dev: DeviceKey) =>
      setConfigured((prev) => ({ ...prev, [id]: { ...prev[id], [dev]: true } })),
    [],
  );

  /** every mutation touches ONLY store[slideId][device] */
  const patchElement = useCallback(
    (id: ElementId, patch: Partial<SlideLayouts[DeviceKey]["elements"][ElementId]>) => {
      setStore((prev) => {
        const cur = prev[slideId];
        if (!cur) return prev;
        const dev = cur[device];
        return {
          ...prev,
          [slideId]: {
            ...cur,
            [device]: {
              ...dev,
              elements: { ...dev.elements, [id]: { ...dev.elements[id], ...patch } },
            },
          },
        };
      });
      setDirty((d) => ({ ...d, [slideId]: true }));
      markConfigured(slideId, device);
    },
    [slideId, device, markConfigured],
  );

  /* ---------------- fit to screen (current canvas only) ---------------- */
  const fitToScreen = useCallback(() => {
    const box = viewportRef.current;
    if (!box) return;
    const pad = 48;
    const z = Math.min(
      (box.clientWidth - pad) / canvas.width,
      (box.clientHeight - pad) / canvas.height,
    );
    setZoom(Math.max(0.1, Math.round(z * 100) / 100));
  }, [canvas.width, canvas.height]);

  useEffect(() => {
    fitToScreen();
  }, [device, fitToScreen]);

  /* ---------------- drag & resize ---------------- */
  const dragRef = useRef<
    | null
    | {
        id: ElementId;
        mode: "move" | "resize";
        startX: number;
        startY: number;
        origin: { x: number; y: number; width: number };
      }
  >(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d || !layout) return;
      const dxPct = ((e.clientX - d.startX) / zoom / canvas.width) * 100;
      const dyPct = ((e.clientY - d.startY) / zoom / canvas.height) * 100;
      if (d.mode === "move") {
        patchElement(d.id, {
          x: Math.round((d.origin.x + dxPct) * 10) / 10,
          y: Math.round((d.origin.y + dyPct) * 10) / 10,
        });
      } else {
        patchElement(d.id, {
          width: Math.max(2, Math.round((d.origin.width + dxPct) * 10) / 10),
        });
      }
    };
    const onUp = () => {
      dragRef.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [layout, zoom, canvas.width, canvas.height, patchElement]);

  const startDrag = (id: ElementId, mode: "move" | "resize", e: React.MouseEvent) => {
    if (!layout) return;
    e.preventDefault();
    e.stopPropagation();
    setSelected(id);
    const el = layout.elements[id];
    dragRef.current = {
      id,
      mode,
      startX: e.clientX,
      startY: e.clientY,
      origin: { x: el.x, y: el.y, width: el.width },
    };
  };

  /* ---------------- copy / reset / save ---------------- */
  const copyLayout = (from: DeviceKey, to: DeviceKey) => {
    setStore((prev) => {
      const cur = prev[slideId];
      if (!cur) return prev;
      const clone = JSON.parse(JSON.stringify(cur[from])) as SlideLayouts[DeviceKey];
      clone.width = DEVICE_CANVASES[to].width;
      clone.height = DEVICE_CANVASES[to].height;
      return { ...prev, [slideId]: { ...cur, [to]: clone } };
    });
    markConfigured(slideId, to);
    setDirty((d) => ({ ...d, [slideId]: true }));
    toast.success(`Copied ${DEVICE_CANVASES[from].label} → ${DEVICE_CANVASES[to].label}`);
  };

  const resetDevice = () => {
    setStore((prev) => {
      const cur = prev[slideId];
      if (!cur) return prev;
      return { ...prev, [slideId]: { ...cur, [device]: defaultLayoutFor(device) } };
    });
    setConfigured((prev) => ({ ...prev, [slideId]: { ...prev[slideId], [device]: false } }));
    setDirty((d) => ({ ...d, [slideId]: true }));
    toast.success(`${canvas.label} layout reset`);
  };

  const handleSave = async () => {
    if (!layouts) return;
    setSaving(true);
    try {
      await save({ data: { slideId, layouts: layouts as unknown as Record<string, unknown> } });
      setDirty((d) => ({ ...d, [slideId]: false }));
      toast.success("Layouts saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const copyTargets = useMemo(
    () => DEVICES.filter((d) => d !== device),
    [device],
  );

  if (adminData && !adminData.isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold">Admin access required</h1>
          <p className="mt-2 text-muted-foreground">
            Your account is signed in but does not have the admin role yet.
          </p>
        </div>
      </main>
    );
  }

  if (isLoading || !layout || !layouts) {
    return <main className="p-10 text-muted-foreground">Loading hero canvases…</main>;
  }

  const isConfigured = configured[slideId]?.[device];

  return (
    <main className="flex h-screen flex-col bg-muted/30">
      {/* toolbar */}
      <header className="flex flex-wrap items-center gap-3 border-b border-border bg-background px-4 py-3">
        <h1 className="mr-2 font-display text-lg font-bold">Hero canvases</h1>

        <div className="flex rounded-lg border border-border p-1">
          {DEVICES.map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                device === d ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {DEVICE_CANVASES[d].label}
            </button>
          ))}
        </div>

        <select
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          value={slideId}
          onChange={(e) => setSlideId(e.target.value)}
        >
          {HERO_SLIDES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        <select
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          value={String(zoom)}
          onChange={(e) => setZoom(Number(e.target.value))}
        >
          {ZOOMS.map((z) => (
            <option key={z} value={z}>
              {Math.round(z * 100)}%
            </option>
          ))}
          {!ZOOMS.includes(zoom) && <option value={zoom}>{Math.round(zoom * 100)}%</option>}
        </select>

        <Button variant="outline" size="sm" onClick={fitToScreen}>
          Fit to screen
        </Button>
        <Button variant="outline" size="sm" onClick={resetDevice}>
          Reset {canvas.label} layout
        </Button>
        <div className="ml-auto flex items-center gap-2">
          {dirty[slideId] && <span className="text-xs text-muted-foreground">Unsaved changes</span>}
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* canvas viewport */}
        <div
          ref={viewportRef}
          className="relative flex flex-1 items-center justify-center overflow-auto p-6"
          onMouseDown={() => setSelected(selected)}
        >
          <div style={{ width: canvas.width * zoom, height: canvas.height * zoom }}>
            <div
              style={{
                width: canvas.width,
                height: canvas.height,
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                boxShadow: "0 20px 60px -20px rgba(0,0,0,0.35)",
                position: "relative",
              }}
            >
              <HeroRenderer
                slide={slide}
                layout={layout}
                index={HERO_SLIDES.indexOf(slide)}
                total={HERO_SLIDES.length}
                staticMode
                style={{ width: "100%", height: "100%" }}
                overlay={(id) => (
                  <div
                    onMouseDown={(e) => startDrag(id, "move", e)}
                    className="absolute inset-0 cursor-move"
                    style={{
                      outline:
                        selected === id ? "2px solid #2563eb" : "1px dashed rgba(255,255,255,0.45)",
                      zIndex: 999,
                    }}
                  >
                    <span
                      className="absolute -top-6 left-0 rounded bg-blue-600 px-1.5 py-0.5 text-[11px] text-white"
                      style={{ display: selected === id ? "block" : "none" }}
                    >
                      {ELEMENT_LABELS[id]}
                    </span>
                    <span
                      onMouseDown={(e) => startDrag(id, "resize", e)}
                      className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-ew-resize rounded-full bg-blue-600"
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* inspector */}
        <aside className="w-80 shrink-0 overflow-auto border-l border-border bg-background p-4">
          {!isConfigured && (
            <div className="mb-4 rounded-lg border border-dashed border-border p-3 text-sm">
              <p className="font-medium">{canvas.label} layout not configured</p>
              <p className="mt-1 text-muted-foreground">
                Showing factory defaults. Edit it, or copy from another device.
              </p>
            </div>
          )}

          <div className="mb-4">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Copy layout into {canvas.label}
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {copyTargets.map((d) => (
                <Button key={d} size="sm" variant="outline" onClick={() => copyLayout(d, device)}>
                  {DEVICE_CANVASES[d].label} → {canvas.label}
                </Button>
              ))}
            </div>
          </div>

          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Layers</Label>
          <div className="mt-2 space-y-1">
            {ELEMENT_IDS.map((id) => (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm ${
                  selected === id ? "bg-accent" : "hover:bg-muted"
                }`}
              >
                <span>{ELEMENT_LABELS[id]}</span>
                <span className="text-xs text-muted-foreground">
                  {layout.elements[id].visible ? "visible" : "hidden"}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-3 rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{ELEMENT_LABELS[selected]}</span>
              <Switch
                checked={layout.elements[selected].visible}
                onCheckedChange={(v) => patchElement(selected, { visible: v })}
              />
            </div>

            <NumberField
              label="X (%)"
              value={layout.elements[selected].x}
              onChange={(v) => patchElement(selected, { x: v })}
            />
            <NumberField
              label="Y (%)"
              value={layout.elements[selected].y}
              onChange={(v) => patchElement(selected, { y: v })}
            />
            <NumberField
              label="Width (%)"
              value={layout.elements[selected].width}
              onChange={(v) => patchElement(selected, { width: v })}
            />
            <NumberField
              label="Font size (px)"
              value={layout.elements[selected].fontSize}
              onChange={(v) => patchElement(selected, { fontSize: v })}
            />
            <NumberField
              label="Z-index"
              value={layout.elements[selected].zIndex}
              onChange={(v) => patchElement(selected, { zIndex: v })}
            />
            <div className="space-y-1">
              <Label className="text-xs">Align</Label>
              <select
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                value={layout.elements[selected].align}
                onChange={(e) =>
                  patchElement(selected, {
                    align: e.target.value as "left" | "center" | "right",
                  })
                }
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Canvas: {canvas.width} × {canvas.height}. Values apply to the {canvas.label} canvas
            only — other devices are untouched.
          </p>
        </aside>
      </div>
    </main>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="text-xs">{label}</Label>
      <Input
        type="number"
        step="0.5"
        className="h-8 w-28"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
