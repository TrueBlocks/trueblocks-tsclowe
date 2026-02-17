package app

import (
	"github.com/TrueBlocks/tsclowe/v2/internal/db"
)

func (a *App) GetTimelineEvents() ([]db.TimelineEvent, error) {
	return a.db.GetTimelineEvents()
}

func (a *App) GetTimelineEvent(id int) (db.TimelineEvent, error) {
	return a.db.GetTimelineEvent(id)
}

func (a *App) CreateTimelineEvent(item db.TimelineEvent) (db.TimelineEvent, error) {
	return a.db.CreateTimelineEvent(item)
}

func (a *App) UpdateTimelineEvent(item db.TimelineEvent) error {
	return a.db.UpdateTimelineEvent(item)
}

func (a *App) DeleteTimelineEvent(id int) error {
	return a.db.DeleteTimelineEvent(id)
}

func (a *App) GetTimelineCategories() ([]string, error) {
	return a.db.GetTimelineCategories()
}
