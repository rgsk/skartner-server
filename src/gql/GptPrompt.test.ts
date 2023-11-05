import { extractWord } from './GptPromptUtils';

describe('extractWord', () => {
  it('should return the extracted word when placeholders match', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word good, and slang meaning of word good, also give synonyms';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe('good');
  });

  it.skip('should return undefined when placeholders do not match', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word good, and slang meaning of word fr, also give synonyms';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe(undefined);
  });

  it.skip('should work with hiphens', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word mother-in-law, and slang meaning of word mother-in-law, also give synonyms';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe('mother-in-law');
  });
  it.skip('should work with spaces', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word sugar daddy, and slang meaning of word sugar daddy, also give synonyms';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe('sugar daddy');
  });

  it.skip('should work with apostrophe', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      "meaning of word don't, and slang meaning of word don't, also give synonyms";
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe("don't");
  });
});
