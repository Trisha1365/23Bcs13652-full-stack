import React, { useState } from "react";

function BookForm({ addBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      addBook(title, author);
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Book Title"
        className="border p-2 rounded w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author Name"
        className="border p-2 rounded w-full mb-2"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Add Book
      </button>
    </form>
  );
}

export default BookForm;
