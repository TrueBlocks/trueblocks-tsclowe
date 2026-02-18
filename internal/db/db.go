package db

import (
	"database/sql"
	"embed"
	"fmt"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

//go:embed schema.sql
var embeddedSchema embed.FS

type DB struct {
	conn *sql.DB
	path string
}

func New(dbPath string) (*DB, error) {
	dir := filepath.Dir(dbPath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return nil, fmt.Errorf("create db dir: %w", err)
	}

	conn, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	conn.SetMaxOpenConns(1)
	conn.SetMaxIdleConns(1)
	conn.SetConnMaxLifetime(0)

	if _, err = conn.Exec("PRAGMA foreign_keys = ON"); err != nil {
		conn.Close()
		return nil, fmt.Errorf("enable foreign keys: %w", err)
	}

	if _, err = conn.Exec("PRAGMA journal_mode = WAL"); err != nil {
		conn.Close()
		return nil, fmt.Errorf("set WAL mode: %w", err)
	}

	return &DB{conn: conn, path: dbPath}, nil
}

func (db *DB) Close() error {
	if db.conn != nil {
		return db.conn.Close()
	}
	return nil
}

func (db *DB) Conn() *sql.DB {
	return db.conn
}

func (db *DB) IsInitialized() (bool, error) {
	var count int
	query := `SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name IN ('inventions','books','links','real_estate','timeline')`
	err := db.conn.QueryRow(query).Scan(&count)
	if err != nil {
		return false, err
	}
	return count == 5, nil
}

func (db *DB) InitSchemaFromFile(path string) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("read schema file: %w", err)
	}
	_, err = db.conn.Exec(string(data))
	if err != nil {
		return fmt.Errorf("exec schema: %w", err)
	}
	return nil
}

func (db *DB) InitSchemaFromEmbedded() error {
	data, err := embeddedSchema.ReadFile("schema.sql")
	if err != nil {
		return fmt.Errorf("read embedded schema: %w", err)
	}
	_, err = db.conn.Exec(string(data))
	if err != nil {
		return fmt.Errorf("exec embedded schema: %w", err)
	}
	return nil
}
