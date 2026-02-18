package db

import "fmt"

type Link struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	URL         string `json:"url"`
	SearchTerms string `json:"searchTerms"`
	IsPDF       bool   `json:"isPDF"`
}

func (db *DB) GetLinks() ([]Link, error) {
	rows, err := db.conn.Query("SELECT id, title, url, search_terms, is_pdf FROM links ORDER BY id")
	if err != nil {
		return nil, fmt.Errorf("query links: %w", err)
	}
	defer rows.Close()

	var items []Link
	for rows.Next() {
		var l Link
		if err := rows.Scan(&l.ID, &l.Title, &l.URL, &l.SearchTerms, &l.IsPDF); err != nil {
			return nil, fmt.Errorf("scan link: %w", err)
		}
		items = append(items, l)
	}
	return items, rows.Err()
}

func (db *DB) GetLink(id int64) (*Link, error) {
	var l Link
	err := db.conn.QueryRow("SELECT id, title, url, search_terms, is_pdf FROM links WHERE id = ?", id).
		Scan(&l.ID, &l.Title, &l.URL, &l.SearchTerms, &l.IsPDF)
	if err != nil {
		return nil, fmt.Errorf("get link %d: %w", id, err)
	}
	return &l, nil
}

func (db *DB) UpdateLink(link *Link) error {
	_, err := db.conn.Exec(
		"UPDATE links SET title=?, url=?, search_terms=?, is_pdf=? WHERE id=?",
		link.Title, link.URL, link.SearchTerms, link.IsPDF, link.ID,
	)
	if err != nil {
		return fmt.Errorf("update link %d: %w", link.ID, err)
	}
	return nil
}

func (db *DB) DeleteLink(id int64) error {
	_, err := db.conn.Exec("DELETE FROM links WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete link %d: %w", id, err)
	}
	return nil
}
