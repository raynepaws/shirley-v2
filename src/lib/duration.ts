let isNumbers = false;

export const parseDuration = (durationString: string) => {
  let duration = 0;
  let buffer = "";
  let isDecimal = false;
  for (const character of durationString) {
    if (/\d/.test(character) && !isNumbers) {
      isNumbers = true;
      isDecimal = false;
      buffer = "";
    }
    if (isNumbers) {
      if (/\d/.test(character)) {
        buffer = buffer.concat(character);
      } else if (character === "." && !isDecimal) {
        buffer = buffer.concat(character);
        isDecimal = true;
      } else if (character === "s") {
        duration += parseNumber(buffer);
      } else if (character === "m") {
        duration += parseNumber(buffer) * 60;
      } else if (character === "h") {
        duration += parseNumber(buffer) * 60 * 60;
      } else if (character === "d") {
        duration += parseNumber(buffer) * 60 * 60 * 24;
      } else if (character === "w") {
        duration += parseNumber(buffer) * 60 * 60 * 24 * 7;
      } else throw new Error(`Unknown symbol "${character}"`);
    }
  }
  return duration;
};

const parseNumber = (string: string) => {
  isNumbers = false;
  const parsed = parseFloat(string);
  if (isNaN(parsed)) throw new Error(`"${string}" is not a valid number`);
  return parsed;
};
