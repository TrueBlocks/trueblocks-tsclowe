package db

import "fmt"

type TimelineEvent struct {
	ID    int64  `json:"id"`
	Date  string `json:"date"`
	Age   int    `json:"age"`
	City  string `json:"city"`
	State string `json:"state"`
	Event string `json:"event"`
}

func (db *DB) GetTimelineEvents() ([]TimelineEvent, error) {
	rows, err := db.conn.Query("SELECT id, date, age, city, state, event FROM timeline ORDER BY date")
	if err != nil {
		return nil, fmt.Errorf("query timeline: %w", err)
	}
	defer rows.Close()

	var items []TimelineEvent
	for rows.Next() {
		var evt TimelineEvent
		if err := rows.Scan(&evt.ID, &evt.Date, &evt.Age, &evt.City, &evt.State, &evt.Event); err != nil {
			return nil, fmt.Errorf("scan timeline: %w", err)
		}
		items = append(items, evt)
	}
	return items, rows.Err()
}

func (db *DB) GetTimelineEvent(id int64) (*TimelineEvent, error) {
	var evt TimelineEvent
	err := db.conn.QueryRow("SELECT id, date, age, city, state, event FROM timeline WHERE id = ?", id).
		Scan(&evt.ID, &evt.Date, &evt.Age, &evt.City, &evt.State, &evt.Event)
	if err != nil {
		return nil, fmt.Errorf("get timeline %d: %w", id, err)
	}
	return &evt, nil
}

func (db *DB) UpdateTimelineEvent(evt *TimelineEvent) error {
	_, err := db.conn.Exec(
		"UPDATE timeline SET date=?, age=?, city=?, state=?, event=? WHERE id=?",
		evt.Date, evt.Age, evt.City, evt.State, evt.Event, evt.ID,
	)
	if err != nil {
		return fmt.Errorf("update timeline %d: %w", evt.ID, err)
	}
	return nil
}

func (db *DB) DeleteTimelineEvent(id int64) error {
	_, err := db.conn.Exec("DELETE FROM timeline WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete timeline %d: %w", id, err)
	}
	return nil
}
