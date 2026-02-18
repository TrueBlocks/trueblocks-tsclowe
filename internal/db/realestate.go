package db

import "fmt"

type RealEstate struct {
	ID       int64  `json:"id"`
	Date     string `json:"date"`
	Type     string `json:"type"`
	Address  string `json:"address"`
	FromWhom string `json:"fromWhom"`
}

func (db *DB) GetRealEstates() ([]RealEstate, error) {
	rows, err := db.conn.Query("SELECT id, date, type, address, from_whom FROM real_estate ORDER BY id")
	if err != nil {
		return nil, fmt.Errorf("query real_estate: %w", err)
	}
	defer rows.Close()

	var items []RealEstate
	for rows.Next() {
		var re RealEstate
		if err := rows.Scan(&re.ID, &re.Date, &re.Type, &re.Address, &re.FromWhom); err != nil {
			return nil, fmt.Errorf("scan real_estate: %w", err)
		}
		items = append(items, re)
	}
	return items, rows.Err()
}

func (db *DB) GetRealEstate(id int64) (*RealEstate, error) {
	var re RealEstate
	err := db.conn.QueryRow("SELECT id, date, type, address, from_whom FROM real_estate WHERE id = ?", id).
		Scan(&re.ID, &re.Date, &re.Type, &re.Address, &re.FromWhom)
	if err != nil {
		return nil, fmt.Errorf("get real_estate %d: %w", id, err)
	}
	return &re, nil
}

func (db *DB) UpdateRealEstate(re *RealEstate) error {
	_, err := db.conn.Exec(
		"UPDATE real_estate SET date=?, type=?, address=?, from_whom=? WHERE id=?",
		re.Date, re.Type, re.Address, re.FromWhom, re.ID,
	)
	if err != nil {
		return fmt.Errorf("update real_estate %d: %w", re.ID, err)
	}
	return nil
}

func (db *DB) DeleteRealEstate(id int64) error {
	_, err := db.conn.Exec("DELETE FROM real_estate WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete real_estate %d: %w", id, err)
	}
	return nil
}
