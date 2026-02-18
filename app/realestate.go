package app

import "github.com/TrueBlocks/trueblocks-tsclowe/v2/internal/db"

func (a *App) GetRealEstates() ([]db.RealEstate, error) {
	return a.db.GetRealEstates()
}

func (a *App) GetRealEstate(id int64) (*db.RealEstate, error) {
	return a.db.GetRealEstate(id)
}

func (a *App) UpdateRealEstate(re *db.RealEstate) error {
	return a.db.UpdateRealEstate(re)
}

func (a *App) DeleteRealEstate(id int64) error {
	return a.db.DeleteRealEstate(id)
}
