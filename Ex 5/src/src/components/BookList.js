import React from "react";

function BookList({ books, removeBook }) {
  return (
    <ul className="space-y-2">
      {books.length > 0 ? (
        books.map((book) => (
          <li
            key={book.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button
              onClick={() => removeBook(book.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))
      ) : (
        <p className="text-gray-500">No books found.</p>
      )}
    </ul>
  );
}

export default BookList;
