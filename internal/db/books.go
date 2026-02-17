package db

import "fmt"

type Book struct {
	ID          int    `json:"id"`
	Year        string `json:"year"`
	Title       string `json:"title"`
	Author      string `json:"author"`
	Publisher   string `json:"publisher"`
	Description string `json:"description"`
}

func (db *DB) GetBooks() ([]Book, error) {
	rows, err := db.conn.Query("SELECT id, year, title, author, publisher, description FROM books ORDER BY year")
	if err != nil {
		return nil, fmt.Errorf("query books: %w", err)
	}
	defer rows.Close()

	var items []Book
	for rows.Next() {
		var item Book
		if err := rows.Scan(&item.ID, &item.Year, &item.Title, &item.Author, &item.Publisher, &item.Description); err != nil {
			return nil, fmt.Errorf("scan book: %w", err)
		}
		items = append(items, item)
	}
	return items, rows.Err()
}

func (db *DB) GetBook(id int) (Book, error) {
	var item Book
	err := db.conn.QueryRow("SELECT id, year, title, author, publisher, description FROM books WHERE id = ?", id).
		Scan(&item.ID, &item.Year, &item.Title, &item.Author, &item.Publisher, &item.Description)
	if err != nil {
		return item, fmt.Errorf("get book %d: %w", id, err)
	}
	return item, nil
}

func (db *DB) CreateBook(item Book) (Book, error) {
	result, err := db.conn.Exec(
		"INSERT INTO books (year, title, author, publisher, description) VALUES (?, ?, ?, ?, ?)",
		item.Year, item.Title, item.Author, item.Publisher, item.Description,
	)
	if err != nil {
		return item, fmt.Errorf("create book: %w", err)
	}
	id, _ := result.LastInsertId()
	item.ID = int(id)
	return item, nil
}

func (db *DB) UpdateBook(item Book) error {
	_, err := db.conn.Exec(
		"UPDATE books SET year = ?, title = ?, author = ?, publisher = ?, description = ?, updated_at = datetime('now') WHERE id = ?",
		item.Year, item.Title, item.Author, item.Publisher, item.Description, item.ID,
	)
	if err != nil {
		return fmt.Errorf("update book %d: %w", item.ID, err)
	}
	return nil
}

func (db *DB) DeleteBook(id int) error {
	_, err := db.conn.Exec("DELETE FROM books WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete book %d: %w", id, err)
	}
	return nil
}
