import Database from "better-sqlite3";

const db = Database(`./db/data.db`, { verbose: console.log })

function museumsRelated() {

    const museums = [
        {
            id: 1,
            name: "LOUVRE museum",
            location: "France, Paris",
        },
        {
            id: 2,
            name: "The Metropolitan Museum of Art",
            location: "USA, New York"
        },
        {
            id: 3,
            name: "Hermitage Museum",
            location: "Russia, Saint Petersburg"
        },
        {
            id: 4,
            name: "Vatican Museums",
            location: "Vatican City"
        }
    ]

    const createMuseumsTable = db.prepare(`

      CREATE TABLE IF NOT EXISTS museums(
        id INTEGER ,
        name TEXT,
        location TEXT,
        PRIMARY KEY(id)
        );
     `)
    createMuseumsTable.run()

    const deleteMuseumTable = db.prepare(`
      DELETE FROM museums;
     `)
    deleteMuseumTable.run()

    const createNewMuseumInMuseums = db.prepare(`

   INSERT INTO museums (name,location) VALUES (@name,@location);

`)


    for (let museum of museums) {
        createNewMuseumInMuseums.run({ id: museum.id, name: museum.name, location: museum.location })
    }
}
museumsRelated()


function worksRealted() {
    const works = [
        {
            id: 1,
            name: "The Raft of the Medusa",
            image: "https://cdn.pariscityvision.com/library/image/5458.jpg",
            museumsId: "1"
        },
        {
            id: 2,
            name: "The Mona Lisa",
            image: "https://cdn.pariscityvision.com/library/image/5449.jpg",
            museumsId: "1"
        },
        {
            id: 3,
            name: "https://thetourguy.com/wp-content/uploads/2020/03/MET-The-Death-of-Socrates-by-Jacques-Louis-David.jpg",
            image: "https://thetourguy.com/wp-content/uploads/2020/03/MET-The-Death-of-Socrates-by-Jacques-Louis-David.jpg",
            museumsId: "2"
        },
        {
            id: 4,
            name: "Julie Le Brun Looking In A Mirror",
            image: "https://thetourguy.com/wp-content/uploads/2020/03/Julie-Le-Brun-by-Elisabeth-Louise-Vige%CC%81e-Le-Brun.jpeg",
            museumsId: "2"
        },
        {
            id: 5,
            name: "The Return of the Prodigal Son",
            image: "https://guidetopetersburg.com/wp-content/uploads/2017/04/sun-remrandt.jpg",
            museumsId: "3"
        },
        {
            id: 6,
            name: " Portrait of a Lady in Blue",
            image: "https://guidetopetersburg.com/wp-content/uploads/2017/04/Thomas_Gainsborough-Portrait_of_a_Lady_in_Blue.jpg",
            museumsId: "3"
        },
        {
            id: 7,
            name: " Adam & Eve In The Garden Of Eden",
            image: "https://theromanguy.com/wp-content/uploads/peter-wenzel.jpeg",
            museumsId: "4"
        },
        {
            id: 8,
            name: "St Matthew",
            image: "https://theromanguy.com/wp-content/uploads/st-matthew.jpeg",
            museumsId: "4"
        },
    ]


    const createWorksTable = db.prepare(`
    
       CREATE TABLE IF NOT EXISTS works(
        id INTEGER,
        name TEXT,
        image TEXT,
        museumsId TEXT ,
        PRIMARY KEY(id)
       );
    `)

    createWorksTable.run()

    const deleteWorksTable = db.prepare(`
    
      DELETE FROM works;
    
    `)

    deleteWorksTable.run()

    const addNewWorksInmuseum = db.prepare(`
      
       INSERT INTO works (name, image, museumsId) VALUES (@name, @image, @museumsId);
    
    `)

    for (let piece of works) {
        addNewWorksInmuseum.run({ name: piece.name, image: piece.image, museumsId: piece.museumsId })
    }
}
worksRealted()