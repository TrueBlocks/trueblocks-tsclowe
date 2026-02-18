package app

import "github.com/TrueBlocks/trueblocks-tsclowe/v2/internal/db"

func (a *App) GetLinks() ([]db.Link, error) {
	return a.db.GetLinks()
}

func (a *App) GetLink(id int64) (*db.Link, error) {
	return a.db.GetLink(id)
}

func (a *App) UpdateLink(link *db.Link) error {
	return a.db.UpdateLink(link)
}

func (a *App) DeleteLink(id int64) error {
	return a.db.DeleteLink(id)
}
