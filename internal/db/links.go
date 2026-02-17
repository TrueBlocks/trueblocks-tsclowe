package db

import "fmt"

type Link struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	URL         string `json:"url"`
	Description string `json:"description"`
}

func (db *DB) GetLinks() ([]Link, error) {
	rows, err := db.conn.Query("SELECT id, title, url, description FROM links ORDER BY title")
	if err != nil {
		return nil, fmt.Errorf("query links: %w", err)
	}
	defer rows.Close()

	var items []Link
	for rows.Next() {
		var item Link
		if err := rows.Scan(&item.ID, &item.Title, &item.URL, &item.Description); err != nil {
			return nil, fmt.Errorf("scan link: %w", err)
		}
		items = append(items, item)
	}
	return items, rows.Err()
}

func (db *DB) GetLink(id int) (Link, error) {
	var item Link
	err := db.conn.QueryRow("SELECT id, title, url, description FROM links WHERE id = ?", id).
		Scan(&item.ID, &item.Title, &item.URL, &item.Description)
	if err != nil {
		return item, fmt.Errorf("get link %d: %w", id, err)
	}
	return item, nil
}

func (db *DB) CreateLink(item Link) (Link, error) {
	result, err := db.conn.Exec(
		"INSERT INTO links (title, url, description) VALUES (?, ?, ?)",
		item.Title, item.URL, item.Description,
	)
	if err != nil {
		return item, fmt.Errorf("create link: %w", err)
	}
	id, _ := result.LastInsertId()
	item.ID = int(id)
	return item, nil
}

func (db *DB) UpdateLink(item Link) error {
	_, err := db.conn.Exec(
		"UPDATE links SET title = ?, url = ?, description = ?, updated_at = datetime('now') WHERE id = ?",
		item.Title, item.URL, item.Description, item.ID,
	)
	if err != nil {
		return fmt.Errorf("update link %d: %w", item.ID, err)
	}
	return nil
}

func (db *DB) DeleteLink(id int) error {
	_, err := db.conn.Exec("DELETE FROM links WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete link %d: %w", id, err)
	}
	return nil
}
