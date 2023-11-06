import { extractWord, findMatches } from './GptPromptUtils';

describe('findMatches', () => {
  it('normal', () => {
    const placeholderPrompt =
      'list meaning and 3 easy example sentences for word - {word}, also list synonyms for {word}, and antonyms';
    const wordPrompt =
      'list meaning and 3 easy example sentences for word - good, also list synonyms for good, and antonyms';
    const result = findMatches(placeholderPrompt, wordPrompt);
    expect(result).toEqual(['good', 'good']);
  });

  it('two words', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word good, and slang meaning of word fr, also give synonyms';
    const result = findMatches(placeholderPrompt, wordPrompt);
    expect(result).toEqual(['good', 'fr']);
  });
  it('string is ending', () => {
    const placeholderPrompt =
      'list meaning and 3 easy example sentences for word - {word}';
    const wordPrompt =
      'list meaning and 3 easy example sentences for word - good';
    const result = findMatches(placeholderPrompt, wordPrompt);
    expect(result).toEqual(['good']);
  });

  it('two words ending', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}';
    const wordPrompt = 'meaning of word good, and slang meaning of word fr';
    const result = findMatches(placeholderPrompt, wordPrompt);
    expect(result).toEqual(['good', 'fr']);
  });
});

describe('extractWord', () => {
  it('should return the extracted word when placeholders match', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word good, and slang meaning of word good, also give synonyms';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe('good');
  });
  it('should return the extracted word when placeholders match, and string is ending', () => {
    const placeholderPrompt =
      'list meaning and 3 easy example sentences for word - {word}';
    const wordPrompt =
      'list meaning and 3 easy example sentences for word - good';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe('good');
  });

  it('should return undefined when placeholders do not match', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word good, and slang meaning of word fr, also give synonyms';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe(undefined);
  });

  it('should work with hiphens', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word mother-in-law, and slang meaning of word mother-in-law, also give synonyms';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe('mother-in-law');
  });
  it('should work with spaces', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      'meaning of word sugar daddy, and slang meaning of word sugar daddy, also give synonyms';
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe('sugar daddy');
  });

  it('should work with apostrophe', () => {
    const placeholderPrompt =
      'meaning of word {word}, and slang meaning of word {word}, also give synonyms';
    const wordPrompt =
      "meaning of word don't, and slang meaning of word don't, also give synonyms";
    const result = extractWord(placeholderPrompt, wordPrompt);
    expect(result).toBe("don't");
  });
});
