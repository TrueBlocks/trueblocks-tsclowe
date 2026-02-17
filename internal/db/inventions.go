package db

import "fmt"

type Invention struct {
	ID          int    `json:"id"`
	Date        string `json:"date"`
	Patent      string `json:"patent"`
	Title       string `json:"title"`
	City        string `json:"city"`
	State       string `json:"state"`
	Description string `json:"description"`
}

func (db *DB) GetInventions() ([]Invention, error) {
	rows, err := db.conn.Query("SELECT id, date, patent, title, city, state, description FROM inventions ORDER BY date")
	if err != nil {
		return nil, fmt.Errorf("query inventions: %w", err)
	}
	defer rows.Close()

	var items []Invention
	for rows.Next() {
		var item Invention
		if err := rows.Scan(&item.ID, &item.Date, &item.Patent, &item.Title, &item.City, &item.State, &item.Description); err != nil {
			return nil, fmt.Errorf("scan invention: %w", err)
		}
		items = append(items, item)
	}
	return items, rows.Err()
}

func (db *DB) GetInvention(id int) (Invention, error) {
	var item Invention
	err := db.conn.QueryRow("SELECT id, date, patent, title, city, state, description FROM inventions WHERE id = ?", id).
		Scan(&item.ID, &item.Date, &item.Patent, &item.Title, &item.City, &item.State, &item.Description)
	if err != nil {
		return item, fmt.Errorf("get invention %d: %w", id, err)
	}
	return item, nil
}

func (db *DB) CreateInvention(item Invention) (Invention, error) {
	result, err := db.conn.Exec(
		"INSERT INTO inventions (date, patent, title, city, state, description) VALUES (?, ?, ?, ?, ?, ?)",
		item.Date, item.Patent, item.Title, item.City, item.State, item.Description,
	)
	if err != nil {
		return item, fmt.Errorf("create invention: %w", err)
	}
	id, _ := result.LastInsertId()
	item.ID = int(id)
	return item, nil
}

func (db *DB) UpdateInvention(item Invention) error {
	_, err := db.conn.Exec(
		"UPDATE inventions SET date = ?, patent = ?, title = ?, city = ?, state = ?, description = ?, updated_at = datetime('now') WHERE id = ?",
		item.Date, item.Patent, item.Title, item.City, item.State, item.Description, item.ID,
	)
	if err != nil {
		return fmt.Errorf("update invention %d: %w", item.ID, err)
	}
	return nil
}

func (db *DB) DeleteInvention(id int) error {
	_, err := db.conn.Exec("DELETE FROM inventions WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete invention %d: %w", id, err)
	}
	return nil
}

type InventionFilterOptions struct {
	States []string `json:"states"`
	Cities []string `json:"cities"`
}

func (db *DB) GetInventionFilterOptions() (InventionFilterOptions, error) {
	var opts InventionFilterOptions

	rows, err := db.conn.Query("SELECT DISTINCT state FROM inventions WHERE state != '' ORDER BY state")
	if err != nil {
		return opts, err
	}
	defer rows.Close()
	for rows.Next() {
		var s string
		if err := rows.Scan(&s); err != nil {
			return opts, err
		}
		opts.States = append(opts.States, s)
	}

	rows2, err := db.conn.Query("SELECT DISTINCT city FROM inventions WHERE city != '' ORDER BY city")
	if err != nil {
		return opts, err
	}
	defer rows2.Close()
	for rows2.Next() {
		var c string
		if err := rows2.Scan(&c); err != nil {
			return opts, err
		}
		opts.Cities = append(opts.Cities, c)
	}
	return opts, nil
}
