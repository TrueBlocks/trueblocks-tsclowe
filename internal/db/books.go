package db

import "fmt"

type Book struct {
	ID               int64  `json:"id"`
	Date             string `json:"date"`
	Title            string `json:"title"`
	Author           string `json:"author"`
	Publisher        string `json:"publisher"`
	PublisherAddress string `json:"publisherAddress"`
}

func (db *DB) GetBooks() ([]Book, error) {
	rows, err := db.conn.Query("SELECT id, date, title, author, publisher, publisher_address FROM books ORDER BY date")
	if err != nil {
		return nil, fmt.Errorf("query books: %w", err)
	}
	defer rows.Close()

	var items []Book
	for rows.Next() {
		var b Book
		if err := rows.Scan(&b.ID, &b.Date, &b.Title, &b.Author, &b.Publisher, &b.PublisherAddress); err != nil {
			return nil, fmt.Errorf("scan book: %w", err)
		}
		items = append(items, b)
	}
	return items, rows.Err()
}

func (db *DB) GetBook(id int64) (*Book, error) {
	var b Book
	err := db.conn.QueryRow("SELECT id, date, title, author, publisher, publisher_address FROM books WHERE id = ?", id).
		Scan(&b.ID, &b.Date, &b.Title, &b.Author, &b.Publisher, &b.PublisherAddress)
	if err != nil {
		return nil, fmt.Errorf("get book %d: %w", id, err)
	}
	return &b, nil
}

func (db *DB) UpdateBook(book *Book) error {
	_, err := db.conn.Exec(
		"UPDATE books SET date=?, title=?, author=?, publisher=?, publisher_address=? WHERE id=?",
		book.Date, book.Title, book.Author, book.Publisher, book.PublisherAddress, book.ID,
	)
	if err != nil {
		return fmt.Errorf("update book %d: %w", book.ID, err)
	}
	return nil
}

func (db *DB) DeleteBook(id int64) error {
	_, err := db.conn.Exec("DELETE FROM books WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete book %d: %w", id, err)
	}
	return nil
}
