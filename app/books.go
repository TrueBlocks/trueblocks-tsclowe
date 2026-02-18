package app

import "github.com/TrueBlocks/trueblocks-tsclowe/v2/internal/db"

func (a *App) GetBooks() ([]db.Book, error) {
	return a.db.GetBooks()
}

func (a *App) GetBook(id int64) (*db.Book, error) {
	return a.db.GetBook(id)
}

func (a *App) UpdateBook(book *db.Book) error {
	return a.db.UpdateBook(book)
}

func (a *App) DeleteBook(id int64) error {
	return a.db.DeleteBook(id)
}
