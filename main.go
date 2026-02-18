package main

import (
	"embed"
	"fmt"

	appkit "github.com/TrueBlocks/trueblocks-art/packages/appkit/v2"
	"github.com/TrueBlocks/trueblocks-tsclowe/v2/app"
	"github.com/TrueBlocks/trueblocks-tsclowe/v2/internal/state"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	application := app.NewApp()
	stateManager := state.NewManager()

	err := appkit.Run(appkit.AppConfig{
		Title:             "TSC Lowe Data Archive",
		Assets:            assets,
		Width:             1200,
		Height:            800,
		BackgroundColour:  &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		GetWindowGeometry: stateManager.GetWindowGeometry,
		OnStartup:         application.Startup,
		OnShutdown:        application.Shutdown,
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId: "com.trueblocks.tsclowe.a7c3e1f9-2b4d-4a6e-8f0c-1d3e5a7b9c2d",
			OnSecondInstanceLaunch: func(data options.SecondInstanceData) {
				_ = data
				fmt.Println("Cannot start a second instance")
			},
		},
		Bind: []interface{}{
			application,
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
