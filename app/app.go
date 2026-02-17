package app

import (
	"context"

	"github.com/TrueBlocks/tsclowe/v2/internal/state"
)

type App struct {
	ctx   context.Context
	state *state.Manager
}

func NewApp() *App {
	return &App{}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.state = state.NewManager()
}

func (a *App) Shutdown(_ context.Context) {
}
