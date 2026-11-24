const books = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: "fantasy",
    read: true,
    rating: 5,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "fiction",
    read: true,
    rating: 4,
  },
  {
    id: 3,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    year: 1988,
    genre: "science",
    read: true,
    rating: 4,
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: 2011,
    genre: "history",
    read: false,
    rating: null,
  },
  {
    id: 5,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    year: 2007,
    genre: "fantasy",
    read: false,
    rating: null,
  },
  {
    id: 6,
    title: "Cosmos",
    author: "Carl Sagan",
    year: 1980,
    genre: "science",
    read: true,
    rating: 5,
  },
  {
    id: 7,
    title: "Educated",
    author: "Tara Westover",
    year: 2018,
    genre: "non-fiction",
    read: false,
    rating: null,
  },
];

let store = books;
let nextId = 8;

function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, 20));
}

export async function getAllBooks() {
  await simulateLatency();
  return store;
}

export async function getBookById(id) {
  await simulateLatency();
  return store.find((book) => book.id === id) ?? null;
}
