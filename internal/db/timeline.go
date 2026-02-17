package db

import "fmt"

type TimelineEvent struct {
	ID       int    `json:"id"`
	Date     string `json:"date"`
	Event    string `json:"event"`
	Category string `json:"category"`
}

func (db *DB) GetTimelineEvents() ([]TimelineEvent, error) {
	rows, err := db.conn.Query("SELECT id, date, event, category FROM timeline_events ORDER BY date")
	if err != nil {
		return nil, fmt.Errorf("query timeline: %w", err)
	}
	defer rows.Close()

	var items []TimelineEvent
	for rows.Next() {
		var item TimelineEvent
		if err := rows.Scan(&item.ID, &item.Date, &item.Event, &item.Category); err != nil {
			return nil, fmt.Errorf("scan timeline event: %w", err)
		}
		items = append(items, item)
	}
	return items, rows.Err()
}

func (db *DB) GetTimelineEvent(id int) (TimelineEvent, error) {
	var item TimelineEvent
	err := db.conn.QueryRow("SELECT id, date, event, category FROM timeline_events WHERE id = ?", id).
		Scan(&item.ID, &item.Date, &item.Event, &item.Category)
	if err != nil {
		return item, fmt.Errorf("get timeline event %d: %w", id, err)
	}
	return item, nil
}

func (db *DB) CreateTimelineEvent(item TimelineEvent) (TimelineEvent, error) {
	result, err := db.conn.Exec(
		"INSERT INTO timeline_events (date, event, category) VALUES (?, ?, ?)",
		item.Date, item.Event, item.Category,
	)
	if err != nil {
		return item, fmt.Errorf("create timeline event: %w", err)
	}
	id, _ := result.LastInsertId()
	item.ID = int(id)
	return item, nil
}

func (db *DB) UpdateTimelineEvent(item TimelineEvent) error {
	_, err := db.conn.Exec(
		"UPDATE timeline_events SET date = ?, event = ?, category = ?, updated_at = datetime('now') WHERE id = ?",
		item.Date, item.Event, item.Category, item.ID,
	)
	if err != nil {
		return fmt.Errorf("update timeline event %d: %w", item.ID, err)
	}
	return nil
}

func (db *DB) DeleteTimelineEvent(id int) error {
	_, err := db.conn.Exec("DELETE FROM timeline_events WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete timeline event %d: %w", id, err)
	}
	return nil
}

func (db *DB) GetTimelineCategories() ([]string, error) {
	rows, err := db.conn.Query("SELECT DISTINCT category FROM timeline_events WHERE category != '' ORDER BY category")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var cats []string
	for rows.Next() {
		var c string
		if err := rows.Scan(&c); err != nil {
			return nil, err
		}
		cats = append(cats, c)
	}
	return cats, rows.Err()
}
