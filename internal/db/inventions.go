package db

import "fmt"

type Invention struct {
	ID           int64  `json:"id"`
	Date         string `json:"date"`
	PatentNumber string `json:"patentNumber"`
	Title        string `json:"title"`
	Inventor     string `json:"inventor"`
	City         string `json:"city"`
	State        string `json:"state"`
	Comments     string `json:"comments"`
}

func (db *DB) GetInventions() ([]Invention, error) {
	rows, err := db.conn.Query("SELECT id, date, patent_number, title, inventor, city, state, comments FROM inventions ORDER BY id")
	if err != nil {
		return nil, fmt.Errorf("query inventions: %w", err)
	}
	defer rows.Close()

	var items []Invention
	for rows.Next() {
		var inv Invention
		if err := rows.Scan(&inv.ID, &inv.Date, &inv.PatentNumber, &inv.Title, &inv.Inventor, &inv.City, &inv.State, &inv.Comments); err != nil {
			return nil, fmt.Errorf("scan invention: %w", err)
		}
		items = append(items, inv)
	}
	return items, rows.Err()
}

func (db *DB) GetInvention(id int64) (*Invention, error) {
	var inv Invention
	err := db.conn.QueryRow("SELECT id, date, patent_number, title, inventor, city, state, comments FROM inventions WHERE id = ?", id).
		Scan(&inv.ID, &inv.Date, &inv.PatentNumber, &inv.Title, &inv.Inventor, &inv.City, &inv.State, &inv.Comments)
	if err != nil {
		return nil, fmt.Errorf("get invention %d: %w", id, err)
	}
	return &inv, nil
}

func (db *DB) UpdateInvention(inv *Invention) error {
	_, err := db.conn.Exec(
		"UPDATE inventions SET date=?, patent_number=?, title=?, inventor=?, city=?, state=?, comments=? WHERE id=?",
		inv.Date, inv.PatentNumber, inv.Title, inv.Inventor, inv.City, inv.State, inv.Comments, inv.ID,
	)
	if err != nil {
		return fmt.Errorf("update invention %d: %w", inv.ID, err)
	}
	return nil
}

func (db *DB) DeleteInvention(id int64) error {
	_, err := db.conn.Exec("DELETE FROM inventions WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete invention %d: %w", id, err)
	}
	return nil
}
