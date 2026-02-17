package app

import (
	"github.com/TrueBlocks/tsclowe/v2/internal/db"
)

func (a *App) GetBooks() ([]db.Book, error) {
	return a.db.GetBooks()
}

func (a *App) GetBook(id int) (db.Book, error) {
	return a.db.GetBook(id)
}

func (a *App) CreateBook(item db.Book) (db.Book, error) {
	return a.db.CreateBook(item)
}

func (a *App) UpdateBook(item db.Book) error {
	return a.db.UpdateBook(item)
}

func (a *App) DeleteBook(id int) error {
	return a.db.DeleteBook(id)
}
