"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { Label } from "@repo/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { toast } from "sonner";
import { ArrowUp, ArrowDown, Trash2, Plus, X, Copy } from "lucide-react";

const COMPONENT_TYPES = [
  { label: "Action Row", value: 1 },
  { label: "Button", value: 2 },
  { label: "Select Menu", value: 3 },
  { label: "Text Input", value: 4 },
  { label: "Text Display", value: 10 },
];

type StyleMap = { [key: string]: string };

function emptyComponent(type: number) {
  switch (type) {
    case 2:
      return { type: 2, style: 1, label: "Button", custom_id: "btn1" };
    case 3:
      return {
        type: 3,
        custom_id: "select1",
        options: [
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ],
      };
    case 4:
      return { type: 4, custom_id: "input1", style: 1, label: "Text Input" };
    case 10:
      return { type: 10, content: "Text Display" };
    case 1:
    default:
      return { type: 1, components: [] };
  }
}

function DiscordButton({ label, style }: { label: string; style: number }) {
  const styleMap: StyleMap = {
    "1": "bg-blurple text-white hover:bg-blurple/90",
    "2": "bg-neutral-700 text-white hover:bg-neutral-600",
    "3": "bg-green-600 text-white hover:bg-green-500",
    "4": "bg-red-600 text-white hover:bg-red-500",
    "5": "bg-transparent text-blurple underline hover:bg-blurple/10",
  };
  return (
    <button
      className={`px-4 py-2 rounded text-sm font-medium transition ${styleMap[String(style)] || styleMap["1"]}`}
      disabled={style === 5}
      type="button"
    >
      {label}
    </button>
  );
}

function DiscordSelect({ options }: { options: any[] }) {
  return (
    <select className="px-3 py-2 rounded bg-neutral-800 text-white text-sm">
      {options?.map((opt, i) => (
        <option key={i} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

function DiscordTextInput({ label }: { label: string }) {
  return (
    <input
      className="px-3 py-2 rounded bg-neutral-800 text-white text-sm"
      placeholder={label}
      disabled
    />
  );
}

function DiscordTextDisplay({ content }: { content: string }) {
  return (
    <div className="px-3 py-2 rounded bg-neutral-900 text-white text-sm border border-neutral-700">
      {content}
    </div>
  );
}

function DiscordActionRow({ components }: { components: any[] }) {
  return (
    <div className="flex gap-2 mt-2">
      {components?.map((comp, i) => renderDiscordComponent(comp, i))}
    </div>
  );
}

function renderDiscordComponent(comp: any, key?: number) {
  if (!comp) return null;
  switch (comp.type) {
    case 2:
      return <DiscordButton key={key} label={comp.label} style={comp.style} />;
    case 3:
      return <DiscordSelect key={key} options={comp.options} />;
    case 4:
      return <DiscordTextInput key={key} label={comp.label} />;
    case 10:
      return <DiscordTextDisplay key={key} content={comp.content} />;
    case 1:
      return <DiscordActionRow key={key} components={comp.components} />;
    default:
      return null;
  }
}

export default function ComponentBuilder() {
  const [components, setComponents] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<number>(2);

  const addComponent = () => {
    const comp = emptyComponent(selectedType);
    setComponents([...components, comp]);
  };

  const updateComponent = (idx: number, field: string, value: any) => {
    const updated = [...components];
    updated[idx] = { ...updated[idx], [field]: value };
    setComponents(updated);
  };

  const removeComponent = (idx: number) => {
    setComponents(components.filter((_, i) => i !== idx));
  };

  const moveComponent = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= components.length) return;
    const arr = [...components];
    const [removed] = arr.splice(idx, 1);
    arr.splice(newIdx, 0, removed);
    setComponents(arr);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(components, null, 2));
    toast.success("JSON copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-8">
        <Card className="border-none shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blurple flex items-center gap-2">
              <Plus className="w-5 h-5" /> Discord Component Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3 items-end">
              <Label className="text-base font-semibold">Component type</Label>
              <Select value={String(selectedType)} onValueChange={v => setSelectedType(Number(v))}>
                <SelectTrigger className="w-56 text-base border-blurple/40 focus:ring-blurple">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent className="border-blurple/40">
                  {COMPONENT_TYPES.map(t => (
                    <SelectItem key={t.value} value={String(t.value)} className="text-base">
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addComponent} size="sm" className="bg-blurple hover:bg-blurple/90 text-white rounded-lg px-4 py-2 flex gap-2 items-center">
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
            <div className="space-y-5">
              {components.length === 0 && <div className="text-muted-foreground text-lg">No components added.</div>}
              {components.map((comp, idx) => (
                <Card key={idx} className="border border-blurple/30 shadow rounded-xl p-4 relative group transition-all">
                  <div className="absolute right-3 top-3 flex gap-1 opacity-80 group-hover:opacity-100 transition">
                    <Button variant="ghost" size="icon" onClick={() => moveComponent(idx, -1)} disabled={idx === 0} className="hover:bg-blurple/20"><ArrowUp className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => moveComponent(idx, 1)} disabled={idx === components.length - 1} className="hover:bg-blurple/20"><ArrowDown className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => removeComponent(idx)} className="hover:bg-red-500/20"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <span className="font-semibold text-lg text-blurple">{COMPONENT_TYPES.find(t => t.value === comp.type)?.label || "Component"}</span>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {comp.type === 2 && (
                      <>
                        <Label className="text-sm">Label</Label>
                        <Input value={comp.label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComponent(idx, "label", e.target.value)} className="border-blurple/20 text-base" />
                        <Label className="text-sm">Custom ID</Label>
                        <Input value={comp.custom_id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComponent(idx, "custom_id", e.target.value)} className="border-blurple/20 text-base" />
                        <Label className="text-sm">Style</Label>
                        <Select value={String(comp.style)} onValueChange={v => updateComponent(idx, "style", Number(v))}>
                          <SelectTrigger className="w-40 border-blurple/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-blurple/20">
                            <SelectItem value="1">Primary</SelectItem>
                            <SelectItem value="2">Secondary</SelectItem>
                            <SelectItem value="3">Success</SelectItem>
                            <SelectItem value="4">Danger</SelectItem>
                            <SelectItem value="5">Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                    {comp.type === 3 && (
                      <>
                        <Label className="text-sm">Custom ID</Label>
                        <Input value={comp.custom_id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComponent(idx, "custom_id", e.target.value)} className="border-blurple/20 text-base" />
                        <Label className="text-sm">Options (JSON)</Label>
                        <Textarea
                          value={JSON.stringify(comp.options, null, 2)}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            try {
                              updateComponent(idx, "options", JSON.parse(e.target.value));
                            } catch {}
                          }}
                          rows={4}
                          className="font-mono border-blurple/20 text-base"
                        />
                      </>
                    )}
                    {comp.type === 4 && (
                      <>
                        <Label className="text-sm">Label</Label>
                        <Input value={comp.label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComponent(idx, "label", e.target.value)} className="border-blurple/20 text-base" />
                        <Label className="text-sm">Custom ID</Label>
                        <Input value={comp.custom_id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComponent(idx, "custom_id", e.target.value)} className="border-blurple/20 text-base" />
                        <Label className="text-sm">Style</Label>
                        <Select value={String(comp.style)} onValueChange={v => updateComponent(idx, "style", Number(v))}>
                          <SelectTrigger className="w-40 border-blurple/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-blurple/20">
                            <SelectItem value="1">Short</SelectItem>
                            <SelectItem value="2">Paragraph</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                    {comp.type === 10 && (
                      <>
                        <Label className="text-sm">Content</Label>
                        <Input value={comp.content} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateComponent(idx, "content", e.target.value)} className="border-blurple/20 text-base" />
                      </>
                    )}
                    {comp.type === 1 && (
                      <>
                        <Label className="text-sm">Components (JSON array)</Label>
                        <Textarea
                          value={JSON.stringify(comp.components, null, 2)}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            try {
                              updateComponent(idx, "components", JSON.parse(e.target.value));
                            } catch {}
                          }}
                          rows={4}
                          className="font-mono border-blurple/20 text-base"
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Label className="text-base font-semibold">JSON preview</Label>
              <Textarea
                value={JSON.stringify(components, null, 2)}
                readOnly
                rows={8}
                className="font-mono border-blurple/20 text-base"
              />
              <Button onClick={copyJson} size="sm" className="mt-2 bg-blurple hover:bg-blurple/90 text-white rounded-lg px-4 py-2 flex gap-2 items-center">
                <Copy className="w-4 h-4" /> Copy JSON
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8 sticky top-8 h-fit">
        <Card className="border-2 border-blurple shadow-2xl rounded-2xl ">
          <CardHeader>
            <CardTitle className="text-blurple text-2xl font-bold">Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-8 rounded-xl border border-neutral-700 flex flex-col gap-4 min-h-[250px] max-h-[700px] overflow-auto shadow-xl">
              {components.length === 0 && <span className="text-neutral-400 text-lg">Nothing to preview.</span>}
              {components.map((comp, i) => renderDiscordComponent(comp, i))}
            </div>
          </CardContent>
        </Card>
        <div className="text-xs text-muted-foreground text-center">
          Based on the official Discord documentation: <a href="https://discord.com/developers/docs/components/using-message-components" target="_blank" className="underline">Message Components</a>
        </div>
      </div>
    </div>
  );
}
