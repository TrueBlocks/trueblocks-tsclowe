package app

type Invention struct {
	Date   string `json:"date"`
	Patent string `json:"patent"`
	Title  string `json:"title"`
	City   string `json:"city"`
	State  string `json:"state"`
}

type Book struct {
	Year      string `json:"year"`
	Title     string `json:"title"`
	Author    string `json:"author"`
	Publisher string `json:"publisher"`
}

type TimelineEvent struct {
	Date  string `json:"date"`
	Event string `json:"event"`
}

type Link struct {
	Title string `json:"title"`
	URL   string `json:"url"`
}

type RealEstate struct {
	Property    string `json:"property"`
	Location    string `json:"location"`
	Description string `json:"description"`
}

type AboutInfo struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type HomeInfo struct {
	Title    string `json:"title"`
	Subtitle string `json:"subtitle"`
	Body     string `json:"body"`
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

func (a *App) GetBooks() []Book {
	return []Book{
		{Year: "1866", Title: "My Balloons in Peace and War", Author: "T.S.C. Lowe", Publisher: "Self-published"},
		{Year: "1905", Title: "Memoirs of Thaddeus S.C. Lowe", Author: "T.S.C. Lowe", Publisher: "Unpublished manuscript"},
		{Year: "1844", Title: "The Great Balloon Enterprise", Author: "Mary Hoehling", Publisher: "Macmillan"},
		{Year: "2004", Title: "The Balloonist: The Story of T.S.C. Lowe", Author: "Linda Lorence Critelli", Publisher: "Kensington"},
		{Year: "1957", Title: "Thaddeus Lowe: America's One-Man Air Corps", Author: "Eugene Block", Publisher: "Howell-North"},
		{Year: "2006", Title: "Professor Lowe's Aerostat", Author: "Raymond Brown", Publisher: "McFarland"},
		{Year: "1980", Title: "The Eagle Aloft", Author: "Tom D. Crouch", Publisher: "Smithsonian Institution Press"},
		{Year: "2010", Title: "Chief Aeronaut", Author: "James Rush", Publisher: "Stony Lane Press"},
	}
}

func (a *App) GetInventions() []Invention {
	return []Invention{
		{Date: "1868-12-15", Patent: "85,021", Title: "Improvement in Ice-Making Machines", City: "New York", State: "NY"},
		{Date: "1869-01-05", Patent: "85,652", Title: "Improvement in Apparatus for Manufacturing Illuminating Gas", City: "New York", State: "NY"},
		{Date: "1869-08-10", Patent: "93,521", Title: "Improvement in Manufacturing Carbonic-Acid Gas", City: "New York", State: "NY"},
		{Date: "1870-02-01", Patent: "99,486", Title: "Improvement in Ice Machines", City: "New York", State: "NY"},
		{Date: "1870-04-19", Patent: "102,262", Title: "Improvement in the Manufacture of Gas", City: "New York", State: "NY"},
		{Date: "1870-12-27", Patent: "110,618", Title: "Improvement in Gas Apparatus", City: "New York", State: "NY"},
		{Date: "1871-05-02", Patent: "114,551", Title: "Improvement in Apparatus for Making Ice", City: "New York", State: "NY"},
		{Date: "1871-06-13", Patent: "115,838", Title: "Improvement in Gas-Making Apparatus", City: "New York", State: "NY"},
		{Date: "1871-12-26", Patent: "122,473", Title: "Improvement in Ice Machines", City: "New York", State: "NY"},
		{Date: "1872-09-10", Patent: "131,090", Title: "Improvement in Apparatus for Manufacturing Gas", City: "New York", State: "NY"},
		{Date: "1873-01-14", Patent: "134,682", Title: "Improvement in Ice-Making Machines", City: "New York", State: "NY"},
		{Date: "1873-03-25", Patent: "137,070", Title: "Improvement in Refrigerating Apparatus", City: "New York", State: "NY"},
		{Date: "1874-07-07", Patent: "152,857", Title: "Improvement in Gas-Making Apparatus", City: "Norristown", State: "PA"},
		{Date: "1875-01-05", Patent: "158,560", Title: "Improvement in Gas Apparatus", City: "Norristown", State: "PA"},
		{Date: "1875-11-30", Patent: "170,525", Title: "Improvement in Ammonia Ice Machines", City: "Norristown", State: "PA"},
		{Date: "1876-01-11", Patent: "172,378", Title: "Improvement in Gas Apparatus", City: "Norristown", State: "PA"},
		{Date: "1877-04-24", Patent: "189,922", Title: "Improvement in Gas Apparatus", City: "Norristown", State: "PA"},
		{Date: "1877-09-11", Patent: "195,192", Title: "Improvement in Apparatus for Making Gas", City: "Norristown", State: "PA"},
		{Date: "1878-06-04", Patent: "204,626", Title: "Improvement in Gas Machines", City: "Norristown", State: "PA"},
		{Date: "1880-03-09", Patent: "225,246", Title: "Gas Machine", City: "Norristown", State: "PA"},
		{Date: "1881-03-01", Patent: "238,628", Title: "Gas Machine", City: "Norristown", State: "PA"},
		{Date: "1882-08-22", Patent: "263,200", Title: "Process of Making Gas", City: "Norristown", State: "PA"},
		{Date: "1883-07-10", Patent: "280,878", Title: "Gas Machine", City: "Norristown", State: "PA"},
		{Date: "1885-04-07", Patent: "315,073", Title: "Gas Machine", City: "Norristown", State: "PA"},
		{Date: "1885-11-17", Patent: "330,612", Title: "Gas Machine", City: "Norristown", State: "PA"},
		{Date: "1887-06-14", Patent: "364,871", Title: "Water Gas Apparatus", City: "Norristown", State: "PA"},
		{Date: "1887-09-13", Patent: "370,072", Title: "Gas Machine", City: "Norristown", State: "PA"},
		{Date: "1888-01-10", Patent: "376,210", Title: "Water Gas Machine", City: "Norristown", State: "PA"},
		{Date: "1889-05-07", Patent: "402,634", Title: "Coke-Oven", City: "Norristown", State: "PA"},
		{Date: "1889-07-16", Patent: "407,330", Title: "Water Gas Apparatus", City: "Norristown", State: "PA"},
		{Date: "1890-10-14", Patent: "438,652", Title: "Water Gas Machine", City: "Pasadena", State: "CA"},
		{Date: "1891-06-30", Patent: "454,935", Title: "Coke-Oven", City: "Pasadena", State: "CA"},
		{Date: "1891-07-28", Patent: "456,841", Title: "Inclined Railway", City: "Pasadena", State: "CA"},
	}
}

func (a *App) GetTimeline() []TimelineEvent {
	return []TimelineEvent{
		{Date: "1832-08-20", Event: "Born in Jefferson Mills (now Riverton), New Hampshire"},
		{Date: "1855", Event: "Married Leontine Augustine Gachon in New York City"},
		{Date: "1856", Event: "Began experiments with lighter-than-air gases"},
		{Date: "1858", Event: "Moved to Philadelphia area, continued balloon experiments"},
		{Date: "1859", Event: "Proposed transatlantic balloon flight"},
		{Date: "1860-06-28", Event: "Made test flight from Cincinnati, landed in South Carolina"},
		{Date: "1861-04", Event: "Offered balloon services to the Union Army"},
		{Date: "1861-06-18", Event: "First aerial telegraph - sent telegram from balloon to White House"},
		{Date: "1861-09", Event: "Appointed Chief Aeronaut of the Union Army Balloon Corps"},
		{Date: "1862", Event: "Provided aerial reconnaissance at battles of Fair Oaks and Fredericksburg"},
		{Date: "1863-04", Event: "Resigned from the Balloon Corps over pay disputes"},
		{Date: "1865", Event: "Began work on ice-making machines after the war"},
		{Date: "1868-12-15", Event: "Received first patent - Improvement in Ice-Making Machines"},
		{Date: "1869", Event: "Established ice manufacturing plant in New York City"},
		{Date: "1870s", Event: "Developed and patented numerous gas manufacturing processes"},
		{Date: "1876", Event: "Exhibited at the Philadelphia Centennial Exposition"},
		{Date: "1880s", Event: "Continued gas manufacturing innovations in Norristown, PA"},
		{Date: "1887", Event: "Moved to Pasadena, California"},
		{Date: "1891", Event: "Began construction of Mount Lowe Railway"},
		{Date: "1893-07-04", Event: "Mount Lowe Railway opened to the public"},
		{Date: "1899", Event: "Lost control of Mount Lowe Railway due to financial difficulties"},
		{Date: "1910", Event: "Began writing memoirs, living in modest circumstances"},
		{Date: "1913-01-16", Event: "Died in Pasadena, California at age 80"},
	}
}

func (a *App) GetLinks() []Link {
	return []Link{
		{Title: "Smithsonian National Air and Space Museum - Lowe", URL: "https://airandspace.si.edu/explore/stories/thaddeus-lowe"},
		{Title: "Mount Lowe Railway - Wikipedia", URL: "https://en.wikipedia.org/wiki/Mount_Lowe_Railway"},
		{Title: "Thaddeus S.C. Lowe - Wikipedia", URL: "https://en.wikipedia.org/wiki/Thaddeus_S._C._Lowe"},
		{Title: "Union Army Balloon Corps - Wikipedia", URL: "https://en.wikipedia.org/wiki/Union_Army_Balloon_Corps"},
		{Title: "Library of Congress - Civil War Balloons", URL: "https://www.loc.gov/pictures/search/?q=civil+war+balloon"},
		{Title: "National Archives - Lowe's Balloon Corps", URL: "https://www.archives.gov/publications/prologue/2000/fall/lowe.html"},
		{Title: "Civil War Trust - Aerial Reconnaissance", URL: "https://www.battlefields.org/learn/articles/aerial-reconnaissance"},
		{Title: "Pasadena Museum of History", URL: "https://pasadenahistory.org/"},
		{Title: "Mount Lowe Preservation Society", URL: "https://mountlowe.org/"},
		{Title: "American Chemical Society - Lowe's Gas Works", URL: "https://www.acs.org/"},
	}
}

func (a *App) GetRealEstate() []RealEstate {
	return []RealEstate{
		{Property: "Norristown Gas Works", Location: "Norristown, PA", Description: "Manufacturing facility for gas-making equipment and ice machines. Lowe operated from here during the 1870s-1880s."},
		{Property: "Mount Lowe Railway & Echo Mountain House", Location: "Pasadena, CA", Description: "Inclined railway ascending the San Gabriel Mountains. Included the Echo Mountain House hotel, observatory, and searchlight. Built 1891-1893."},
		{Property: "Lowe Residence", Location: "Pasadena, CA", Description: "The Lowe family home in Pasadena where they lived after relocating from Pennsylvania in 1887."},
	}
}
