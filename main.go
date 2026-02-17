package main

import (
	"embed"
	"fmt"

	appkit "github.com/TrueBlocks/trueblocks-art/packages/appkit/v2"
	"github.com/TrueBlocks/tsclowe/v2/app"
	"github.com/TrueBlocks/tsclowe/v2/internal/state"
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
		Width:             1100,
		Height:            750,
		GetWindowGeometry: stateManager.GetWindowGeometry,
		OnStartup:         application.Startup,
		OnShutdown:        application.Shutdown,
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId: "com.trueblocks.tsclowe.a1b2c3d4-e5f6-7890-abcd-ef1234567890",
			OnSecondInstanceLaunch: func(data options.SecondInstanceData) {
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
