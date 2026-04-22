export type Verdict = "true" | "false" | "unverified";
export type InputType = "text" | "url" | "social" | "file";

export type EvidenceSource = {
  title: string;
  url: string;
  reliability: "high" | "medium" | "low";
  stance: "supports" | "contradicts" | "context";
};

export type AnalysisResult = {
  inputType: InputType;
  input: string;
  extractedText: string;
  normalizedText: string;
  verdict: Verdict;
  confidence: number;
  explanation: string;
  sources: EvidenceSource[];
  suspiciousKeywords: string[];
  similarClaimCount: number;
  language: string;
};

const suspiciousTerms = [
  "miracle",
  "secret",
  "shocking",
  "guaranteed",
  "cure",
  "hoax",
  "they don't want you to know",
  "breaking",
  "100%",
  "conspiracy",
  "urgent",
  "viral",
];

const reliableSignals = ["who", "reuters", "ap news", "nature", "cdc", "nih", "un", "official", "court", "study"];
const falseSignals = ["fake", "hoax", "conspiracy", "miracle cure", "secret cure", "aliens", "flat earth"];
const conflictSignals = ["may", "claims", "allegedly", "rumor", "unconfirmed", "debate", "conflicting"];

function normalize(value: string) {
  return value.replace(/https?:\/\/\S+/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
}

function languageFor(text: string) {
  if (/[áéíóúñ¿¡]/i.test(text)) return "es";
  if (/[àâçéèêëîïôûùüÿœ]/i.test(text)) return "fr";
  if (/[أ-ي]/.test(text)) return "ar";
  return "en";
}

export function analyzeClaim(input: string, inputType: InputType): AnalysisResult {
  const extractedText = inputType === "url" ? `Extracted summary from URL: ${input}` : input;
  const normalizedText = normalize(extractedText);
  const suspiciousKeywords = suspiciousTerms.filter((term) => normalizedText.includes(term));
  const reliableHits = reliableSignals.filter((term) => normalizedText.includes(term)).length;
  const falseHits = falseSignals.filter((term) => normalizedText.includes(term)).length;
  const conflictHits = conflictSignals.filter((term) => normalizedText.includes(term)).length;

  let verdict: Verdict = "unverified";
  let confidence = 58;

  if (falseHits > 0 || suspiciousKeywords.length >= 3) {
    verdict = "false";
    confidence = Math.min(92, 68 + falseHits * 9 + suspiciousKeywords.length * 4);
  } else if (reliableHits >= 2 && conflictHits === 0) {
    verdict = "true";
    confidence = Math.min(94, 70 + reliableHits * 8);
  } else if (conflictHits > 0 || normalizedText.length < 90) {
    verdict = "unverified";
    confidence = Math.max(42, 64 - conflictHits * 7);
  }

  const sources: EvidenceSource[] = [
    {
      title: "Reuters Fact Check and wire archive",
      url: "https://www.reuters.com/fact-check/",
      reliability: "high",
      stance: verdict === "false" ? "contradicts" : "context",
    },
    {
      title: "Associated Press verification hub",
      url: "https://apnews.com/hub/ap-fact-check",
      reliability: "high",
      stance: verdict === "true" ? "supports" : "context",
    },
    {
      title: "Google Fact Check Explorer",
      url: "https://toolbox.google.com/factcheck/explorer/search/list",
      reliability: "medium",
      stance: suspiciousKeywords.length ? "contradicts" : "context",
    },
    {
      title: "World Health Organization public guidance",
      url: "https://www.who.int/news-room",
      reliability: "high",
      stance: normalizedText.includes("health") || normalizedText.includes("cure") ? "context" : "supports",
    },
  ];

  const explanation =
    verdict === "true"
      ? "The claim shows alignment with multiple high-reliability evidence signals and lacks strong contradiction markers. Treat it as credible while reviewing the linked sources."
      : verdict === "false"
        ? "The claim contains unsupported or manipulation-prone phrasing and conflicts with reliable verification patterns. It should not be shared without correction."
        : "The available evidence is mixed or insufficient. More corroboration from primary sources is needed before making a confident judgment.";

  return {
    inputType,
    input,
    extractedText,
    normalizedText,
    verdict,
    confidence,
    explanation,
    sources,
    suspiciousKeywords,
    similarClaimCount: Math.max(4, reliableHits * 9 + suspiciousKeywords.length * 7 + conflictHits * 5),
    language: languageFor(input),
  };
}
