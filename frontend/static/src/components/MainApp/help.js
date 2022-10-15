import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

function BookList() {
  const [books, setBooks] = useState(null);
  const [text, setText] = useState("");
  const [bookID, setBookID] = useState("select");

  const handleError = (err) => {
    console.warn(err);
  };

  const getBooks = useCallback(async () => {
    const response = await fetch("/api_v1/books/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setBooks(data);
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]); // dependency, when this changes the methods trigger again

  if (!books) {
    return <div>Fetching data ...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      text,
      book: bookID,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(review),
    };
    const response = await fetch("/api_v1/reviews/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  const options = books.map((book) => (
    <option key={book.id} value={book.id}>
      {book.title}
    </option>
  ));

  const html = books.map((book) => (
    <li key={book.id}>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      {book.image ? <img src={book.image} alt={book.title} /> : null}
    </li>
  ));

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <select value={bookID} onChange={(e) => setBookID(e.target.value)}>
          <option value="select">Select a book</option>
          {options}
        </select>
        <button type="submit">Submit</button>
      </form>
      <ul>{html}</ul>
    </div>
  );
}

export default BookList;
