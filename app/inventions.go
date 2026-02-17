package app

import (
	"github.com/TrueBlocks/tsclowe/v2/internal/db"
)

func (a *App) GetInventions() ([]db.Invention, error) {
	return a.db.GetInventions()
}

func (a *App) GetInvention(id int) (db.Invention, error) {
	return a.db.GetInvention(id)
}

func (a *App) CreateInvention(item db.Invention) (db.Invention, error) {
	return a.db.CreateInvention(item)
}

func (a *App) UpdateInvention(item db.Invention) error {
	return a.db.UpdateInvention(item)
}

func (a *App) DeleteInvention(id int) error {
	return a.db.DeleteInvention(id)
}

func (a *App) GetInventionFilterOptions() (db.InventionFilterOptions, error) {
	return a.db.GetInventionFilterOptions()
}
