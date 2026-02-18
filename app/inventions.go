package app

import "github.com/TrueBlocks/trueblocks-tsclowe/v2/internal/db"

func (a *App) GetInventions() ([]db.Invention, error) {
	return a.db.GetInventions()
}

func (a *App) GetInvention(id int64) (*db.Invention, error) {
	return a.db.GetInvention(id)
}

func (a *App) UpdateInvention(inv *db.Invention) error {
	return a.db.UpdateInvention(inv)
}

func (a *App) DeleteInvention(id int64) error {
	return a.db.DeleteInvention(id)
}
