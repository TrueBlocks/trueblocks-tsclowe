package db

import "fmt"

type RealEstate struct {
	ID          int    `json:"id"`
	Property    string `json:"property"`
	Location    string `json:"location"`
	Description string `json:"description"`
	YearsActive string `json:"yearsActive"`
}

func (db *DB) GetRealEstateItems() ([]RealEstate, error) {
	rows, err := db.conn.Query("SELECT id, property, location, description, years_active FROM real_estate ORDER BY property")
	if err != nil {
		return nil, fmt.Errorf("query real estate: %w", err)
	}
	defer rows.Close()

	var items []RealEstate
	for rows.Next() {
		var item RealEstate
		if err := rows.Scan(&item.ID, &item.Property, &item.Location, &item.Description, &item.YearsActive); err != nil {
			return nil, fmt.Errorf("scan real estate: %w", err)
		}
		items = append(items, item)
	}
	return items, rows.Err()
}

func (db *DB) GetRealEstateItem(id int) (RealEstate, error) {
	var item RealEstate
	err := db.conn.QueryRow("SELECT id, property, location, description, years_active FROM real_estate WHERE id = ?", id).
		Scan(&item.ID, &item.Property, &item.Location, &item.Description, &item.YearsActive)
	if err != nil {
		return item, fmt.Errorf("get real estate %d: %w", id, err)
	}
	return item, nil
}

func (db *DB) CreateRealEstateItem(item RealEstate) (RealEstate, error) {
	result, err := db.conn.Exec(
		"INSERT INTO real_estate (property, location, description, years_active) VALUES (?, ?, ?, ?)",
		item.Property, item.Location, item.Description, item.YearsActive,
	)
	if err != nil {
		return item, fmt.Errorf("create real estate: %w", err)
	}
	id, _ := result.LastInsertId()
	item.ID = int(id)
	return item, nil
}

func (db *DB) UpdateRealEstateItem(item RealEstate) error {
	_, err := db.conn.Exec(
		"UPDATE real_estate SET property = ?, location = ?, description = ?, years_active = ?, updated_at = datetime('now') WHERE id = ?",
		item.Property, item.Location, item.Description, item.YearsActive, item.ID,
	)
	if err != nil {
		return fmt.Errorf("update real estate %d: %w", item.ID, err)
	}
	return nil
}

func (db *DB) DeleteRealEstateItem(id int) error {
	_, err := db.conn.Exec("DELETE FROM real_estate WHERE id = ?", id)
	if err != nil {
		return fmt.Errorf("delete real estate %d: %w", id, err)
	}
	return nil
}
