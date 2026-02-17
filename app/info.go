package app

type HomeInfo struct {
	Title    string `json:"title"`
	Subtitle string `json:"subtitle"`
	Body     string `json:"body"`
}

type AboutInfo struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

func (a *App) GetHomeInfo() HomeInfo {
	return HomeInfo{
		Title:    "The Encyclopedic Encyclopedia of TSC Lowe",
		Subtitle: "A Data Archive for the Life and Times of Thaddeus Sobieski Constantine Lowe",
		Body:     "Welcome to the encyclopedic encyclopedia of Thaddeus S.C. Lowe (1832-1913), aeronaut, scientist, and inventor. Lowe is best known for his work during the American Civil War, where he served as the Chief Aeronaut of the Union Army Balloon Corps. After the war, he became a successful entrepreneur and inventor, holding patents for ice-making machines, gas manufacturing processes, and other innovations. This archive collects data about his life, inventions, publications, and real estate holdings.",
	}
}

func (a *App) GetAboutInfo() AboutInfo {
	return AboutInfo{
		Title:       "About This Archive",
		Description: "The TSC Lowe Data Archive is a collection of information about Thaddeus Sobieski Constantine Lowe (1832-1913). Lowe was a self-taught scientist, meteorologist, inventor, and aeronaut. He is most well known for his work during the Civil War as the Chief Aeronaut of the Union Army Balloon Corps, providing aerial reconnaissance for the Union forces. After the war, Lowe became a prolific inventor and entrepreneur, developing ice-making machines, improving gas manufacturing processes, and building the famous Mount Lowe Railway in Pasadena, California.",
	}
}
