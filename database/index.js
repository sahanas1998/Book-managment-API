let books = [
  {
    ISBN: '12345ONE',
    title: 'Introduction of MERN',
    authors: [1, 2, 3],
    language: 'English',
    pubDate: '2021-05-10',
    numPage: 223,
    category: ['fiction', 'programmimg', 'tech', 'wed dev'],
    publication: 1,
  },
  {
    ISBN: '12345TWO',
    title: 'Introduction of Python',
    authors: [1, 2],
    language: 'English',
    pubDate: '2021-03-13',
    numPage: 423,
    category: ['fiction', 'tech', 'wed dev'],
    publication: 1,
  },
];

let authors = [
  {
    a_id: 1,
    name: 'pavan',
    books: ['12345ONE'],
  },
  {
    a_id: 2,
    name: 'lavan',
    books: ['12345ONE'],
  },
  {
    a_id: 3,
    name: 'raja',
    books: ['12345TWO'],
  },
];

const publications = [
  {
    id: 1,
    name: 'chakra',
    books: ['12345ONE', '12345TWO', '12345FIVE'],
  },
  {
    id: 2,
    name: 'viththu',
    books: ['12345TWO'],
  },
];

module.exports = { books, authors, publications };
