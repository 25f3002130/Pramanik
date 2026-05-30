export type AnalysisMode = "image" | "text" | "video";

export const trustStats = [
  { value: "< 1s", label: "client-side video frame sampling with ffmpeg.wasm" },
  { value: "3 modes", label: "image, text, and video detection in one flow" },
  { value: "0 storage", label: "no request content persisted or logged" }
] as const;

export const pitchSignals = [
  {
    title: "Privacy is the moat",
    description:
      "Video frames are extracted locally in the browser, and the serverless proxy only protects API keys."
  },
  {
    title: "Explainability beats a raw score",
    description:
      "Veritas highlights the suspicious text, image regions, or frames that push a verdict over the line."
  },
  {
    title: "Built for the extension later",
    description:
      "The demo is structured as a modular analysis layer so the browser extension can reuse it directly."
  }
] as const;

export const processSteps = [
  {
    title: "User submits content",
    description:
      "Image upload, pasted text, or video file / URL. Nothing is retained after the analysis completes."
  },
  {
    title: "The right detector runs",
    description:
      "Primary AI APIs handle detection, with silent fallback if a provider is rate limited or unavailable."
  },
  {
    title: "Explainable result appears",
    description:
      "Confidence, verdict, and reasons are shown together so the audience can see the signal behind the score."
  }
] as const;

export const demoExamples = [
  {
    id: "whatsapp-forward",
    title: "Forwarded WhatsApp clip",
    mode: "video" as const,
    verdict: "Likely AI-generated",
    confidence: 91,
    summary:
      "Temporal sampling found repeated face geometry drift across multiple frames, which is typical in synthetic clips.",
    cues: [
      "Frame 03 and Frame 08 show inconsistent ear edges.",
      "Lip sync slightly decouples after the mid-point.",
      "Lighting remains unnaturally constant while the background shifts."
    ],
    videoBreakdown: [
      { frame: "00:02", label: "Clean intro frame", score: 18 },
      { frame: "00:05", label: "Mild artifact cluster", score: 67 },
      { frame: "00:08", label: "Face boundary drift", score: 92 },
      { frame: "00:11", label: "Highest-risk frame", score: 96 }
    ]
  },
  {
    id: "opinion-post",
    title: "Suspicious social post",
    mode: "text" as const,
    verdict: "Likely AI-generated",
    confidence: 86,
    summary:
      "The writing is polished but overly symmetrical, with repeated phrasing and low stylistic entropy.",
    cues: [
      "Two adjacent sentences repeat the same sentence structure.",
      "The claim density is high while personal detail is unusually generic.",
      "Transitions sound template-like rather than conversational."
    ],
    textBreakdown: [
      {
        sentence: "This groundbreaking solution will transform every workflow overnight.",
        risk: 78
      },
      {
        sentence: "It offers unmatched productivity, unmatched clarity, and unmatched efficiency.",
        risk: 91
      },
      {
        sentence: "Teams everywhere will instantly feel the difference.",
        risk: 73
      }
    ]
  },
  {
    id: "profile-photo",
    title: "Profile image upload",
    mode: "image" as const,
    verdict: "Possibly AI-generated",
    confidence: 74,
    summary:
      "The image contains subtle symmetry and texture regularity around the eyes and hairline.",
    cues: [
      "Skin texture is smoother than the surrounding noise pattern.",
      "Hair strands contain repeated micro-shapes.",
      "The background blur is unusually even."
    ],
    imageHighlights: [
      { region: "Left eye corner", score: 84 },
      { region: "Hairline", score: 77 },
      { region: "Jaw edge", score: 69 }
    ]
  }
] as const;
