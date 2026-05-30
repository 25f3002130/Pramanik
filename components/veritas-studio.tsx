"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AnalysisMode, demoExamples } from "@/lib/demo-content";

const modeConfig: Record<
  AnalysisMode,
  {
    title: string;
    hint: string;
    placeholder: string;
  }
> = {
  image: {
    title: "Image detection",
    hint: "Upload a screenshot, portrait, or forwarded image.",
    placeholder: "Drop an image here or choose a file"
  },
  text: {
    title: "Text detection",
    hint: "Paste a post, message, email, or blog paragraph.",
    placeholder: "Paste text to analyze"
  },
  video: {
    title: "Video detection",
    hint: "Drop a file or paste a URL for temporal sampling analysis.",
    placeholder: "Upload video or paste a link"
  }
};

export function PramanikStudio() {
  const [mode, setMode] = useState<AnalysisMode>("video");
  const [selectedExampleId, setSelectedExampleId] = useState<string>(demoExamples[0]?.id ?? "");
  const [textValue, setTextValue] = useState("");
  const [imageFileName, setImageFileName] = useState("No image selected yet");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [videoFileName, setVideoFileName] = useState("No video file selected yet");
  const [videoUrl, setVideoUrl] = useState("");

  const currentExample = useMemo(
    () => demoExamples.find((example) => example.id === selectedExampleId) ?? demoExamples[0],
    [selectedExampleId]
  );

  const activeResult =
    currentExample?.mode === mode
      ? currentExample
      : demoExamples.find((example) => example.mode === mode) ?? currentExample;

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  useEffect(() => {
    if (currentExample?.mode === "text" && currentExample.sampleText) {
      setTextValue(currentExample.sampleText);
    }
    if (currentExample?.mode === "image") {
      setImageFileName(currentExample.inputLabel ?? "Image sample loaded");
    }
    if (currentExample?.mode === "video") {
      setVideoFileName(currentExample.inputLabel ?? "Video sample loaded");
    }
  }, [currentExample]);

  const handleImageInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImageFileName(file.name);
    setMode("image");

    setImagePreviewUrl((existingUrl) => {
      if (existingUrl) {
        URL.revokeObjectURL(existingUrl);
      }
      return URL.createObjectURL(file);
    });
  };

  const handleVideoInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setVideoFileName(file.name);
    setMode("video");
  };

  return (
    <section className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/88 p-5 shadow-soft backdrop-blur lg:grid-cols-[1fr_1.05fr] lg:p-6">
      <div className="rounded-[1.75rem] border border-ink-200 bg-ink-50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-700">Pramanik console</p>
            <h3 className="mt-2 font-display text-3xl text-ink-900">Analyze real content in a privacy-first flow.</h3>
          </div>
          <div className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
            Privacy-first demo
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 rounded-full bg-white p-1 shadow-sm">
          {(Object.keys(modeConfig) as AnalysisMode[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                mode === item ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-100"
              }`}
            >
              {modeConfig[item].title}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-dashed border-brand-300 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-ink-900">{modeConfig[mode].title}</p>
              <p className="mt-1 text-sm leading-6 text-ink-600">{modeConfig[mode].hint}</p>
            </div>
            <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-600">
              {mode === "video" ? "ffmpeg.wasm local sampling" : "API proxy only"}
            </span>
          </div>

          {mode === "image" ? (
            <div className="mt-4 space-y-4">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-ink-300 bg-ink-900 px-5 py-8 text-center text-white transition hover:border-brand-300 hover:bg-ink-800">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-200">Upload image</span>
                <span className="mt-3 text-lg font-semibold">Choose a screenshot, portrait, or forwarded photo</span>
                <span className="mt-2 text-sm leading-6 text-ink-100/75">Your file stays in the browser until you send it to the proxy layer later.</span>
                <input type="file" accept="image/*" onChange={handleImageInput} className="sr-only" />
              </label>

              <div className="rounded-3xl border border-ink-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Selected image</p>
                <p className="mt-2 text-sm text-ink-800">{imageFileName}</p>
                {imagePreviewUrl ? (
                  <div className="relative mt-4 h-48 w-full overflow-hidden rounded-3xl">
                    <img
                      src={imagePreviewUrl}
                      alt="Selected preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mt-4 flex h-48 items-center justify-center rounded-3xl bg-ink-100 text-sm text-ink-500">
                    Preview appears here after upload.
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {mode === "text" ? (
            <div className="mt-4 space-y-4">
              <label className="block rounded-3xl border border-ink-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Paste text</span>
                  <span className="text-xs text-ink-500">{textValue.length.toLocaleString()} chars</span>
                </div>
                <textarea
                  value={textValue}
                  onChange={(event) => setTextValue(event.target.value)}
                  rows={9}
                  placeholder="Paste a blog post, WhatsApp message, tweet, or article paragraph here."
                  className="mt-3 w-full resize-none rounded-2xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm leading-6 text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-400"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setTextValue(demoExamples.find((example) => example.id === "opinion-post")?.sampleText ?? "")}
                  className="rounded-3xl border border-ink-200 bg-white px-4 py-4 text-left text-sm font-medium text-ink-800 transition hover:border-brand-300"
                >
                  Load suspicious post example
                </button>
                <button
                  type="button"
                  onClick={() => setTextValue("")}
                  className="rounded-3xl border border-ink-200 bg-white px-4 py-4 text-left text-sm font-medium text-ink-800 transition hover:border-brand-300"
                >
                  Clear text area
                </button>
              </div>
            </div>
          ) : null}

          {mode === "video" ? (
            <div className="mt-4 space-y-4">
              <label className="block rounded-3xl border border-ink-200 bg-white p-4">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Video URL</span>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(event) => setVideoUrl(event.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="mt-3 w-full rounded-2xl border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-400"
                />
                <p className="mt-2 text-xs leading-5 text-ink-500">
                  Best for direct media URLs. YouTube and social embeds will need a later extraction step.
                </p>
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-ink-300 bg-ink-900 px-5 py-8 text-center text-white transition hover:border-brand-300 hover:bg-ink-800">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-200">Upload video</span>
                <span className="mt-3 text-lg font-semibold">Choose a clip for local frame sampling</span>
                <span className="mt-2 text-sm leading-6 text-ink-100/75">ffmpeg.wasm keeps frame extraction inside the browser, so the raw video never leaves the device.</span>
                <input type="file" accept="video/*" onChange={handleVideoInput} className="sr-only" />
              </label>

              <div className="rounded-3xl border border-ink-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Selected media</p>
                <p className="mt-2 text-sm text-ink-800">{videoFileName}</p>
                <div className="mt-4 rounded-3xl bg-ink-100 px-4 py-4 text-sm leading-6 text-ink-600">
                  Frame sampling will later show which timestamps are suspicious, not just the final verdict.
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-4 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <label className="block rounded-3xl border border-ink-200 bg-white p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Demo content</span>
              <select
                value={selectedExampleId}
                onChange={(event) => setSelectedExampleId(event.target.value)}
                className="mt-2 w-full bg-transparent text-sm font-medium text-ink-900 outline-none"
              >
                {demoExamples.map((example) => (
                  <option key={example.id} value={example.id}>
                    {example.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="rounded-3xl border border-ink-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Action</p>
              <button
                type="button"
                className="mt-3 w-full rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Run analysis
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-ink-200 bg-ink-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Live input snapshot</p>
            <div className="mt-3 grid gap-3 text-sm text-ink-700 md:grid-cols-3">
              <div className="rounded-2xl bg-white px-4 py-3">
                <span className="block text-xs uppercase tracking-[0.2em] text-ink-500">Mode</span>
                <span className="mt-1 block font-medium text-ink-900">{modeConfig[mode].title}</span>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                <span className="block text-xs uppercase tracking-[0.2em] text-ink-500">Input</span>
                <span className="mt-1 block font-medium text-ink-900">
                  {mode === "text"
                    ? `${textValue.length.toLocaleString()} chars pasted`
                    : mode === "image"
                      ? imageFileName
                      : videoUrl || videoFileName}
                </span>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                <span className="block text-xs uppercase tracking-[0.2em] text-ink-500">Privacy</span>
                <span className="mt-1 block font-medium text-ink-900">No storage, no logs, no retention.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Primary API</p>
            <p className="mt-2 text-sm font-medium text-ink-900">
              {mode === "image" ? "Google Vision AI" : mode === "text" ? "Writer.com" : "Sightengine"}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Fallback</p>
            <p className="mt-2 text-sm font-medium text-ink-900">
              {mode === "image" ? "Hive Moderation" : mode === "text" ? "GPTZero" : "Frame majority vote"}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Privacy</p>
            <p className="mt-2 text-sm font-medium text-ink-900">No storage, no logging, no content retention.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-ink-200 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-700">Result preview</p>
            <h3 className="mt-2 font-display text-3xl text-ink-900">{activeResult?.title}</h3>
          </div>
          <div className="rounded-2xl bg-ink-900 px-4 py-3 text-right text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-100/70">Confidence</p>
            <p className="text-2xl font-semibold">{activeResult?.confidence}%</p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-ink-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ink-500">Verdict</p>
          <p className="mt-2 text-2xl font-semibold text-ink-900">{activeResult?.verdict}</p>
          <p className="mt-3 text-sm leading-6 text-ink-700">{activeResult?.summary}</p>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Why it was flagged</p>
            <div className="mt-3 space-y-3">
              {activeResult?.cues.map((cue) => (
                <div key={cue} className="rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm leading-6 text-ink-700">
                  {cue}
                </div>
              ))}
            </div>
          </div>

          {mode === "video" && activeResult && "videoBreakdown" in activeResult ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Frame breakdown</p>
              <div className="mt-3 grid gap-3">
                {activeResult.videoBreakdown.map((frame) => (
                  <div key={frame.frame} className="grid grid-cols-[80px_1fr_auto] items-center gap-3 rounded-2xl border border-ink-200 px-4 py-3">
                    <span className="font-medium text-ink-900">{frame.frame}</span>
                    <span className="text-sm text-ink-600">{frame.label}</span>
                    <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">{frame.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {mode === "text" && activeResult && "textBreakdown" in activeResult ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Flagged sentences</p>
              <div className="mt-3 space-y-3">
                {activeResult.textBreakdown.map((sentence) => (
                  <div key={sentence.sentence} className="rounded-2xl border border-ink-200 px-4 py-3">
                    <p className="text-sm leading-6 text-ink-700">{sentence.sentence}</p>
                    <div className="mt-2 h-2 rounded-full bg-ink-100">
                      <div className="h-2 rounded-full bg-brand-500" style={{ width: `${sentence.risk}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {mode === "image" && activeResult && "imageHighlights" in activeResult ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Suspicious regions</p>
              <div className="mt-3 space-y-3">
                {activeResult.imageHighlights.map((region) => (
                  <div key={region.region} className="flex items-center justify-between rounded-2xl border border-ink-200 px-4 py-3">
                    <span className="text-sm font-medium text-ink-800">{region.region}</span>
                    <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">{region.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
