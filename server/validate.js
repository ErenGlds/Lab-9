export const GENRES = [
  "fiction",
  "non-fiction",
  "science",
  "history",
  "fantasy",
  "other",
];

const BOOK_FIELDS = ["title", "author", "year", "genre", "read", "rating"];

export function parseId(raw) {
  if (typeof raw !== "string" || !/^[1-9]\d*$/.test(raw)) return null;
  const id = Number(raw);
  return Number.isSafeInteger(id) ? id : null;
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function pickBookFields(body) {
  if (!isPlainObject(body)) return {};
  return Object.fromEntries(
    BOOK_FIELDS.filter((key) => key in body).map((key) => [key, body[key]]),
  );
}

export function validateBook(input) {
  if (!isPlainObject(input)) {
    return { error: "Request body must be a JSON object" };
  }

  const title = typeof input.title === "string" ? input.title.trim() : "";
  if (title.length < 1 || title.length > 100) {
    return { error: "title must be a string of 1 to 100 characters" };
  }

  const author = typeof input.author === "string" ? input.author.trim() : "";
  if (author.length < 1 || author.length > 100) {
    return { error: "author must be a string of 1 to 100 characters" };
  }

  const currentYear = new Date().getFullYear();
  if (
    !Number.isInteger(input.year) ||
    input.year < 1000 ||
    input.year > currentYear
  ) {
    return { error: `year must be an integer between 1000 and ${currentYear}` };
  }

  if (!GENRES.includes(input.genre)) {
    return { error: `genre must be one of: ${GENRES.join(", ")}` };
  }

  const read = input.read === undefined ? false : input.read;
  if (typeof read !== "boolean") {
    return { error: "read must be a boolean" };
  }

  const rating = input.rating === undefined ? null : input.rating;
  if (rating !== null) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return { error: "rating must be an integer from 1 to 5, or null" };
    }
    if (!read) {
      return { error: "rating is only allowed when read is true" };
    }
  }

  return {
    value: {
      title,
      author,
      year: input.year,
      genre: input.genre,
      read,
      rating,
    },
  };
}
