const express = require('express');
const database = require('./database/index');
//initialing express
const shapeAI = express();
//configuration
shapeAI.use(express.json());

shapeAI.get('/book', (req, res) => {
  return res.json({ books: database.books });
});

shapeAI.get('/book1/:isbn', (req, res) => {
  const getSepcipicBook = database.books.filter(
    (book) => book.ISBN == req.params.isbn
  );

  if (getSepcipicBook.length === 0) {
    return res.json({
      error: `no book found for the ISBN of${req.params.isbn}`,
    });
  }
  return res.json({ book: getSepcipicBook });
});

// shapeAI.get('/', (req, res) => {
//   return res.json({ books: database.books });
// });

shapeAI.get('/book2/:category', (req, res) => {
  const getBooks = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getBooks.length === 0) {
    return res.json({
      error: `no book found for the category of${req.params.category}`,
    });
  }
  return res.json({ book: getBooks });
});

// shapeAI.get('/book3/:name', (req, res) => {
//   const getauthorBook = database.books.filter((book) =>
//     book.authors.includes(req.params.authors)
//   );
//   const g_author = database.authors.filter((author) =>
//     author.a_id.includes(req.params.a_id)
//   );
//   const bookname = database.authors.filter((author) =>
//     author.books.includes(req.params.books)
//   );

//   if (g_author.length === 0) {
//     return res.json({
//       error: `no book found for the autor of${req.params.name}`,
//     });
//   }
//   if (getauthorBook === g_author) return res.json({ authors: getauthorBook });
// });
shapeAI.get('/author', (req, res) => {
  return res.json({ authors: database.authors });
});

shapeAI.get('/author1/:name', (req, res) => {
  const getSepcipicAuthor = database.authors.filter(
    (author) => author.name == req.params.name
  );

  if (getSepcipicAuthor.length === 0) {
    return res.json({
      error: `no author found for the name of${req.params.name}`,
    });
  }
  return res.json({ author: getSepcipicAuthor });
});
shapeAI.get('/author2/:isbn', (req, res) => {
  const getAuthor = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getAuthor.length === 0) {
    return res.json({
      error: `no author found for the book of${req.params.isbn}`,
    });
  }
  return res.json({ authors: getAuthor });
});

//publication

shapeAI.get('/publication', (req, res) => {
  return res.json({ publications: database.publications });
});

shapeAI.get('/publication1/:name', (req, res) => {
  const getSepcipicAuthor = database.publications.filter(
    (publication) => publication.name == req.params.name
  );

  if (getSepcipicAuthor.length === 0) {
    return res.json({
      error: `no author found for the name of${req.params.name}`,
    });
  }
  return res.json({ author: getSepcipicAuthor });
});
shapeAI.get('/publication2/:isbn', (req, res) => {
  const getAuthor = database.publications.filter((publication) =>
    publication.books.includes(req.params.isbn)
  );

  if (getAuthor.length === 0) {
    return res.json({
      error: `no author found for the book of${req.params.isbn}`,
    });
  }
  return res.json({ authors: getAuthor });
});

shapeAI.post('/book/new', (req, res) => {
  const { newBook } = req.body;
  database.books.push(newBook);

  return res.json({ books: database.books, message: 'book was add' });
});

shapeAI.post('/author/new', (req, res) => {
  const { newAuthor } = req.body;
  database.authors.push(newAuthor);

  return res.json({ authors: database.authors, message: 'author was add' });
});

shapeAI.post('/publication/new', (req, res) => {
  const { newPublication } = req.body;
  database.publications.push(newPublication);

  return res.json({
    publications: database.publications,
    message: 'publication was add',
  });
});

shapeAI.put('/book/update/:isbn', (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.bookTitle;
      return;
    }
  });
  return res.json({ books: database.books });
});

shapeAI.put('/book/author/update/:isbn', (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn)
      return book.authors.push(req.body.newAuthor);

    database.authors.forEach((author) => {
      if (author.a_id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });
  });
  return res.json({
    book: database.books,
    authors: database.authors,
    message: 'New author add',
  });
});

shapeAI.put('/publication/update/:ID', (req, res) => {
  database.publications.forEach((publication) => {
    if (publication.id == req.params.ID) {
      publication.name = req.body.newName;
      return;
    }
  });
  return res.json({ publications: database.publications });
});

shapeAI.put('/publication/updte/book/:isbn', (req, res) => {
  database.publications.forEach((publication) => {
    if (publication.id === req.body.pubID)
      return publication.books.push(req.params.isbn);
  });
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubID;
      return;
    }
  });
  return res.json({
    book: database.books,
    publication: database.publications,
    message: 'Suess',
  });
});

// delate

shapeAI.delete('/book/delete/:isbn', (req, res) => {
  const updatebookdatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );
  database.books = updatebookdatabase;
  return res.json({ books: database.books });
});

shapeAI.delete('/book/delete/:author', (req, res) => {
  const updatebookdatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );
  database.books = updatebookdatabase;
  return res.json({ books: database.books });
});

shapeAI.delete('/book/delete/author/:isbn/:authorID', (req, res) => {
  database.books.filter((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorlist = book.authors.filter(
        (author) => author !== parseInt(req.params.authorID)
      );

      book.authors = newAuthorlist;
      return;
    }
  });
  database.authors.forEach((author) => {
    if (author.a_id === parseInt(req.params.authorID)) {
      const newBooklist = author.books.filter(
        (book) => book !== req.params.isbn
      );

      author.books = newBooklist;
      return;
    }
  });
  return res.json({ book: database.books, author: database.authors });
});

shapeAI.delete('/author/delete/:ID', (req, res) => {
  const updateauthordatabase = database.authors.filter(
    (author) => author.a_id !== req.params.ID
  );
  database.authors = updateauthordatabase;
  return res.json({ authors: database.authors });
});

shapeAI.listen(3000, () => console.log('Server runing'));
