package app

import "github.com/TrueBlocks/trueblocks-tsclowe/v2/internal/db"

func (a *App) GetTimelineEvents() ([]db.TimelineEvent, error) {
	return a.db.GetTimelineEvents()
}

func (a *App) GetTimelineEvent(id int64) (*db.TimelineEvent, error) {
	return a.db.GetTimelineEvent(id)
}

func (a *App) UpdateTimelineEvent(evt *db.TimelineEvent) error {
	return a.db.UpdateTimelineEvent(evt)
}

func (a *App) DeleteTimelineEvent(id int64) error {
	return a.db.DeleteTimelineEvent(id)
}
