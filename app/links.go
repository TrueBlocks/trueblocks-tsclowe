package app

import (
	"github.com/TrueBlocks/tsclowe/v2/internal/db"
)

func (a *App) GetLinks() ([]db.Link, error) {
	return a.db.GetLinks()
}

func (a *App) GetLink(id int) (db.Link, error) {
	return a.db.GetLink(id)
}

func (a *App) CreateLink(item db.Link) (db.Link, error) {
	return a.db.CreateLink(item)
}

func (a *App) UpdateLink(item db.Link) error {
	return a.db.UpdateLink(item)
}

func (a *App) DeleteLink(id int) error {
	return a.db.DeleteLink(id)
}
