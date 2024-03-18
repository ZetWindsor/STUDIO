import express from 'express';
import "express-async-errors";
import morgan from 'morgan';
import Joi from 'joi';
const app = express();
const port = 3002;
let books = [
    { title: "Il Grande Gatsby", author: "F. Scott Fitzgerald", isbn: 9780451524935, category: "Narrativa", pages: 180, firstYearPublication: 1925, language: "Italiano" },
    { title: "1984", author: "George Orwell", isbn: 9780451524936, category: "Distopico", pages: 328, firstYearPublication: 1949, language: "Italiano" },
    { title: "Il Buio Oltre la Siepe", author: "Harper Lee", isbn: 9780061120084, category: "Narrativa", pages: 336, firstYearPublication: 1960, language: "Italiano" },
    { title: "Il Giovane Holden", author: "J.D. Salinger", isbn: 9780241950432, category: "Narrativa", pages: 224, firstYearPublication: 1951, language: "Italiano" },
    { title: "Lo Hobbit", author: "J.R.R. Tolkien", isbn: 9780261102217, category: "Fantasy", pages: 310, firstYearPublication: 1937, language: "Italiano" },
    { title: "Harry Potter e la Pietra Filosofale", author: "J.K. Rowling", isbn: 9780590353427, category: "Fantasy", pages: 320, firstYearPublication: 1997, language: "Italiano" },
    { title: "Il Signore degli Anelli", author: "J.R.R. Tolkien", isbn: 9780544003415, category: "Fantasy", pages: 1178, firstYearPublication: 1954, language: "Italiano" },
    { title: "Il Codice Da Vinci", author: "Dan Brown", isbn: 9780307474278, category: "Mistero", pages: 481, firstYearPublication: 2003, language: "Italiano" },
    { title: "L'Alchimista", author: "Paulo Coelho", isbn: 9780061122415, category: "Narrativa", pages: 197, firstYearPublication: 1988, language: "Italiano" },
    { title: "Shining", author: "Stephen King", isbn: 9780307743657, category: "Horror", pages: 688, firstYearPublication: 1977, language: "Italiano" },
    { title: "Le Avventure di Alice nel Paese delle Meraviglie", author: "Lewis Carroll", isbn: 9780451524937, category: "Fantasy", pages: 200, firstYearPublication: 1865, language: "Italiano" },
    { title: "Le Cronache di Narnia", author: "C.S. Lewis", isbn: 9780061127762, category: "Fantasy", pages: 767, firstYearPublication: 1950, language: "Italiano" },
    { title: "Il Mondo Nuovo", author: "Aldous Huxley", isbn: 9780060850524, category: "Distopico", pages: 288, firstYearPublication: 1932, language: "Italiano" },
    { title: "Hunger Games", author: "Suzanne Collins", isbn: 9780439023528, category: "Distopico", pages: 374, firstYearPublication: 2008, language: "Italiano" },
    { title: "Guida Galattica per Autostoppisti", author: "Douglas Adams", isbn: 9780345391803, category: "Fantascienza", pages: 193, firstYearPublication: 1979, language: "Italiano" },
    { title: "L'Ombra dello Scorpione", author: "Stephen King", isbn: 9780307743688, category: "Horror", pages: 823, firstYearPublication: 1978, language: "Italiano" },
    { title: "Frankenstein", author: "Mary Shelley", isbn: 9780486282114, category: "Horror", pages: 166, firstYearPublication: 1818, language: "Italiano" },
    { title: "Cent'Anni di Solitudine", author: "Gabriel García Márquez", isbn: 9780061120084, category: "Realismo Magico", pages: 417, firstYearPublication: 1967, language: "Spagnolo" },
    { title: "La Guerra dei Mondi", author: "H.G. Wells", isbn: 9780486295064, category: "Fantascienza", pages: 192, firstYearPublication: 1898, language: "Italiano" },
    { title: "Jurassic Park", author: "Michael Crichton", isbn: 9780345538987, category: "Fantascienza", pages: 399, firstYearPublication: 1990, language: "Italiano" },
    { title: "Millennium - Uomini che Odiano le Donne", author: "Stieg Larsson", isbn: 9780307949486, category: "Mistero", pages: 672, firstYearPublication: 2005, language: "Italiano" },
    { title: "La Strada", author: "Cormac McCarthy", isbn: 9780307387899, category: "Post-apocalittico", pages: 287, firstYearPublication: 2006, language: "Italiano" },
    { title: "Come Diventare Dio Del Full-Stack", author: "Alex D'Antonys", isbn: 9999999999999, category: "La Vita", pages: 666, firstYearPublication: 2024, language: "Italiano, html, css ,js" },
    { title: "Il Cacciatore di Aquiloni", author: "Khaled Hosseini", isbn: 9781594631931, category: "Narrativa Storica", pages: 371, firstYearPublication: 2003, language: "Italiano" },
    { title: "Il Gioco di Ender", author: "Orson Scott Card", isbn: 9780312853235, category: "Fantascienza", pages: 324, firstYearPublication: 1985, language: "Italiano" },
    { title: "La Principessa Bride", author: "William Goldman", isbn: 9780345418265, category: "Fantasy", pages: 398, firstYearPublication: 1973, language: "Italiano" },
    { title: "Il Ritratto di Dorian Gray", author: "Oscar Wilde", isbn: 9780141439570, category: "Gotico", pages: 194, firstYearPublication: 1890, language: "Italiano" },
    { title: "Marte", author: "Andy Weir", isbn: 9780553418026, category: "Fantascienza", pages: 387, firstYearPublication: 2011, language: "Italiano" },
    { title: "Il Silmarillion", author: "J.R.R. Tolkien", isbn: 9780345325815, category: "Fantasy", pages: 365, firstYearPublication: 1977, language: "Italiano" },
    { title: "Dune", author: "Frank Herbert", isbn: 9780441013593, category: "Fantascienza", pages: 800, firstYearPublication: 1965, language: "Italiano" },
    { title: "Il Nome del Vento", author: "Patrick Rothfuss", isbn: 9788804645074, category: "Fantasy", pages: 864, firstYearPublication: 2007, language: "Italiano" },
    { title: "Il Piccolo Principe", author: "Antoine de Saint-Exupéry", isbn: 9788845275484, category: "Letteratura per Ragazzi", pages: 93, firstYearPublication: 1943, language: "Italiano" },
    { title: "Il Ladro di Fulmini", author: "Rick Riordan", isbn: 9788804635907, category: "Fantasy", pages: 432, firstYearPublication: 2005, language: "Italiano" },
    { title: "Il Paziente Inglese", author: "Michael Ondaatje", isbn: 9788878183615, category: "Storico", pages: 320, firstYearPublication: 1992, language: "Italiano" },
    { title: "Il Vecchio e il Mare", author: "Ernest Hemingway", isbn: 9788804489610, category: "Narrativa", pages: 124, firstYearPublication: 1952, language: "Italiano" },
    { title: "Anna Karenina", author: "Lev Tolstoj", isbn: 9788804680136, category: "Romanzo", pages: 864, firstYearPublication: 1877, language: "Italiano" },
    { title: "La Ragazza di Fuoco", author: "Suzanne Collins", isbn: 9788804622785, category: "Distopico", pages: 441, firstYearPublication: 2009, language: "Italiano" },
    { title: "Il Corvo", author: "Edgar Allan Poe", isbn: 9788845274265, category: "Poesia", pages: 96, firstYearPublication: 1845, language: "Italiano" },
    { title: "Il Conte di Montecristo", author: "Alexandre Dumas", isbn: 9788804623041, category: "Avventura", pages: 1672, firstYearPublication: 1844, language: "Italiano" },
    { title: "Il Grande Inverno", author: "Ken Follett", isbn: 9788804672360, category: "Storico", pages: 448, firstYearPublication: 2007, language: "Italiano" },
];
app.use(morgan("dev"));
app.use(express.json()); //questo per il post
app.get("/api/books", (req, res) => {
    res.status(200).json(books);
});
app.get('/api/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.find((p) => p.isbn === Number(isbn));
    res.status(200).json(book);
});
const bookSchema = Joi.object({
    isbn: Joi.number().integer().required(),
    title: Joi.string().required(),
});
app.post('/api/books', (req, res) => {
    const { isbn, title, author, category, pages, firstYearPublication, language } = req.body;
    const newBook = { isbn, title, author, category, pages, firstYearPublication, language };
    const valisbnateNewBook = bookSchema.validate(newBook);
    if (valisbnateNewBook.error) {
        return res.status(400).json({ msg: valisbnateNewBook.error.details[0].message });
    }
    else {
        books = [...books, newBook];
        res.status(201).json({ msg: 'new planet created' });
    }
});
app.put("/api/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { title } = req.body;
    books = books.map(p => p.isbn === Number(isbn) ? (Object.assign(Object.assign({}, p), { title })) : p);
    console.log(books);
    res.status(200).json({ msg: 'Book added' });
});
app.delete("/api/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    books = books.filter(p => p.isbn !== Number(isbn));
    res.status(200).json({ msg: "Freezer ha distrutto il pianeta" });
});
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
