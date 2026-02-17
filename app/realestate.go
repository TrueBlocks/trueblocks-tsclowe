package app

import (
	"github.com/TrueBlocks/tsclowe/v2/internal/db"
)

func (a *App) GetRealEstateItems() ([]db.RealEstate, error) {
	return a.db.GetRealEstateItems()
}

func (a *App) GetRealEstateItem(id int) (db.RealEstate, error) {
	return a.db.GetRealEstateItem(id)
}

func (a *App) CreateRealEstateItem(item db.RealEstate) (db.RealEstate, error) {
	return a.db.CreateRealEstateItem(item)
}

func (a *App) UpdateRealEstateItem(item db.RealEstate) error {
	return a.db.UpdateRealEstateItem(item)
}

func (a *App) DeleteRealEstateItem(id int) error {
	return a.db.DeleteRealEstateItem(id)
}
