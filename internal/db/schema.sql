CREATE TABLE IF NOT EXISTS inventions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL DEFAULT '',
    patent TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL DEFAULT '',
    state TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL DEFAULT '',
    author TEXT NOT NULL DEFAULT '',
    publisher TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS timeline_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL DEFAULT '',
    event TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL DEFAULT '',
    url TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS real_estate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property TEXT NOT NULL DEFAULT '',
    location TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    years_active TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed data: Inventions
INSERT INTO inventions (date, patent, title, city, state) VALUES
('1868-12-15', '85,021', 'Improvement in Ice-Making Machines', 'New York', 'NY'),
('1869-01-05', '85,652', 'Improvement in Apparatus for Manufacturing Illuminating Gas', 'New York', 'NY'),
('1869-08-10', '93,521', 'Improvement in Manufacturing Carbonic-Acid Gas', 'New York', 'NY'),
('1870-02-01', '99,486', 'Improvement in Ice Machines', 'New York', 'NY'),
('1870-04-19', '102,262', 'Improvement in the Manufacture of Gas', 'New York', 'NY'),
('1870-12-27', '110,618', 'Improvement in Gas Apparatus', 'New York', 'NY'),
('1871-05-02', '114,551', 'Improvement in Apparatus for Making Ice', 'New York', 'NY'),
('1871-06-13', '115,838', 'Improvement in Gas-Making Apparatus', 'New York', 'NY'),
('1871-12-26', '122,473', 'Improvement in Ice Machines', 'New York', 'NY'),
('1872-09-10', '131,090', 'Improvement in Apparatus for Manufacturing Gas', 'New York', 'NY'),
('1873-01-14', '134,682', 'Improvement in Ice-Making Machines', 'New York', 'NY'),
('1873-03-25', '137,070', 'Improvement in Refrigerating Apparatus', 'New York', 'NY'),
('1874-07-07', '152,857', 'Improvement in Gas-Making Apparatus', 'Norristown', 'PA'),
('1875-01-05', '158,560', 'Improvement in Gas Apparatus', 'Norristown', 'PA'),
('1875-11-30', '170,525', 'Improvement in Ammonia Ice Machines', 'Norristown', 'PA'),
('1876-01-11', '172,378', 'Improvement in Gas Apparatus', 'Norristown', 'PA'),
('1877-04-24', '189,922', 'Improvement in Gas Apparatus', 'Norristown', 'PA'),
('1877-09-11', '195,192', 'Improvement in Apparatus for Making Gas', 'Norristown', 'PA'),
('1878-06-04', '204,626', 'Improvement in Gas Machines', 'Norristown', 'PA'),
('1880-03-09', '225,246', 'Gas Machine', 'Norristown', 'PA'),
('1881-03-01', '238,628', 'Gas Machine', 'Norristown', 'PA'),
('1882-08-22', '263,200', 'Process of Making Gas', 'Norristown', 'PA'),
('1883-07-10', '280,878', 'Gas Machine', 'Norristown', 'PA'),
('1885-04-07', '315,073', 'Gas Machine', 'Norristown', 'PA'),
('1885-11-17', '330,612', 'Gas Machine', 'Norristown', 'PA'),
('1887-06-14', '364,871', 'Water Gas Apparatus', 'Norristown', 'PA'),
('1887-09-13', '370,072', 'Gas Machine', 'Norristown', 'PA'),
('1888-01-10', '376,210', 'Water Gas Machine', 'Norristown', 'PA'),
('1889-05-07', '402,634', 'Coke-Oven', 'Norristown', 'PA'),
('1889-07-16', '407,330', 'Water Gas Apparatus', 'Norristown', 'PA'),
('1890-10-14', '438,652', 'Water Gas Machine', 'Pasadena', 'CA'),
('1891-06-30', '454,935', 'Coke-Oven', 'Pasadena', 'CA'),
('1891-07-28', '456,841', 'Inclined Railway', 'Pasadena', 'CA');

-- Seed data: Books
INSERT INTO books (year, title, author, publisher) VALUES
('1866', 'My Balloons in Peace and War', 'T.S.C. Lowe', 'Self-published'),
('1905', 'Memoirs of Thaddeus S.C. Lowe', 'T.S.C. Lowe', 'Unpublished manuscript'),
('1844', 'The Great Balloon Enterprise', 'Mary Hoehling', 'Macmillan'),
('2004', 'The Balloonist: The Story of T.S.C. Lowe', 'Linda Lorence Critelli', 'Kensington'),
('1957', 'Thaddeus Lowe: America''s One-Man Air Corps', 'Eugene Block', 'Howell-North'),
('2006', 'Professor Lowe''s Aerostat', 'Raymond Brown', 'McFarland'),
('1980', 'The Eagle Aloft', 'Tom D. Crouch', 'Smithsonian Institution Press'),
('2010', 'Chief Aeronaut', 'James Rush', 'Stony Lane Press');

-- Seed data: Timeline Events
INSERT INTO timeline_events (date, event, category) VALUES
('1832-08-20', 'Born in Jefferson Mills (now Riverton), New Hampshire', 'personal'),
('1855', 'Married Leontine Augustine Gachon in New York City', 'personal'),
('1856', 'Began experiments with lighter-than-air gases', 'science'),
('1858', 'Moved to Philadelphia area, continued balloon experiments', 'personal'),
('1859', 'Proposed transatlantic balloon flight', 'science'),
('1860-06-28', 'Made test flight from Cincinnati, landed in South Carolina', 'science'),
('1861-04', 'Offered balloon services to the Union Army', 'military'),
('1861-06-18', 'First aerial telegraph - sent telegram from balloon to White House', 'military'),
('1861-09', 'Appointed Chief Aeronaut of the Union Army Balloon Corps', 'military'),
('1862', 'Provided aerial reconnaissance at battles of Fair Oaks and Fredericksburg', 'military'),
('1863-04', 'Resigned from the Balloon Corps over pay disputes', 'military'),
('1865', 'Began work on ice-making machines after the war', 'invention'),
('1868-12-15', 'Received first patent - Improvement in Ice-Making Machines', 'invention'),
('1869', 'Established ice manufacturing plant in New York City', 'business'),
('1870s', 'Developed and patented numerous gas manufacturing processes', 'invention'),
('1876', 'Exhibited at the Philadelphia Centennial Exposition', 'business'),
('1880s', 'Continued gas manufacturing innovations in Norristown, PA', 'invention'),
('1887', 'Moved to Pasadena, California', 'personal'),
('1891', 'Began construction of Mount Lowe Railway', 'business'),
('1893-07-04', 'Mount Lowe Railway opened to the public', 'business'),
('1899', 'Lost control of Mount Lowe Railway due to financial difficulties', 'business'),
('1910', 'Began writing memoirs, living in modest circumstances', 'personal'),
('1913-01-16', 'Died in Pasadena, California at age 80', 'personal');

-- Seed data: Links
INSERT INTO links (title, url) VALUES
('Smithsonian National Air and Space Museum - Lowe', 'https://airandspace.si.edu/explore/stories/thaddeus-lowe'),
('Mount Lowe Railway - Wikipedia', 'https://en.wikipedia.org/wiki/Mount_Lowe_Railway'),
('Thaddeus S.C. Lowe - Wikipedia', 'https://en.wikipedia.org/wiki/Thaddeus_S._C._Lowe'),
('Union Army Balloon Corps - Wikipedia', 'https://en.wikipedia.org/wiki/Union_Army_Balloon_Corps'),
('Library of Congress - Civil War Balloons', 'https://www.loc.gov/pictures/search/?q=civil+war+balloon'),
('National Archives - Lowe''s Balloon Corps', 'https://www.archives.gov/publications/prologue/2000/fall/lowe.html'),
('Civil War Trust - Aerial Reconnaissance', 'https://www.battlefields.org/learn/articles/aerial-reconnaissance'),
('Pasadena Museum of History', 'https://pasadenahistory.org/'),
('Mount Lowe Preservation Society', 'https://mountlowe.org/'),
('American Chemical Society - Lowe''s Gas Works', 'https://www.acs.org/');

-- Seed data: Real Estate
INSERT INTO real_estate (property, location, description, years_active) VALUES
('Norristown Gas Works', 'Norristown, PA', 'Manufacturing facility for gas-making equipment and ice machines. Lowe operated from here during the 1870s-1880s.', '1874-1887'),
('Mount Lowe Railway & Echo Mountain House', 'Pasadena, CA', 'Inclined railway ascending the San Gabriel Mountains. Included the Echo Mountain House hotel, observatory, and searchlight. Built 1891-1893.', '1891-1899'),
('Lowe Residence', 'Pasadena, CA', 'The Lowe family home in Pasadena where they lived after relocating from Pennsylvania in 1887.', '1887-1913');
