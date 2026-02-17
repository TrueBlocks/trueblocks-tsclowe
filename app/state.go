package app

import (
	"github.com/TrueBlocks/tsclowe/v2/internal/state"
)

func (a *App) GetSidebarWidth() int {
	return a.state.GetSidebarWidth()
}

func (a *App) SetSidebarWidth(width int) {
	a.state.SetSidebarWidth(width)
}

func (a *App) GetTableState(tableName string) state.TableState {
	return a.state.GetTableState(tableName)
}

func (a *App) SetTableState(tableName string, tableState state.TableState) {
	a.state.SetTableState(tableName, tableState)
}

func (a *App) GetTab(pageName string) string {
	return a.state.GetTab(pageName)
}

func (a *App) SetTab(pageName string, tab string) {
	a.state.SetTab(pageName, tab)
}
