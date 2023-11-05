export function extractWord(
  placeholderPrompt: string,
  wordPrompt: string
): string {
  const wordIndex = placeholderPrompt.indexOf('{word}');
  const start = wordPrompt.slice(wordIndex);
  return start.slice(0, start.match(/[^a-zA-Z]+/)?.index ?? 0);
}
