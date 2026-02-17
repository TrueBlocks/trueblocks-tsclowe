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

func (a *App) SaveWindowGeometry(x, y, width, height int) {
	a.state.SetWindowGeometry(x, y, width, height)
}

func (a *App) GetTabRoute(key string) string {
	return a.state.GetTabRoute(key)
}

func (a *App) SetTabRoute(key, route string) {
	a.state.SetTabRoute(key, route)
}

func (a *App) GetLastRoute() string {
	return a.state.GetLastRoute()
}

func (a *App) SaveLastRoute(route string) {
	a.state.SetLastRoute(route)
}
