"use server";

import { sustainabilityScore } from "@/ai/flows/sustainability-scoring";
import { sustainabilityTool } from "@/ai/flows/sustainability-tool";
import type { CatchData, CatchResult } from "@/types";

export async function logNewCatch(
  data: CatchData
): Promise<CatchResult | { error: string }> {
  try {
    const scoreData = await sustainabilityScore(data);
    const newCatch: CatchResult = {
      ...data,
      id: crypto.randomUUID(),
      score: scoreData.score,
      rationale: scoreData.rationale,
    };
    return newCatch;
  } catch (e) {
    console.error(e);
    return { error: "Failed to score the catch. Please try again." };
  }
}

export async function getSustainabilityTips(
  data: CatchData
): Promise<{ recommendations: string } | { error: string }> {
  try {
    const result = await sustainabilityTool(data);
    return { recommendations: result.recommendations };
  } catch (e) {
    console.error(e);
    return {
      error: "Failed to get sustainability recommendations. Please try again.",
    };
  }
}
