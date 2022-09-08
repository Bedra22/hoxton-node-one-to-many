import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const app = express()
const port = 5000

const db = Database(`./db/data.db`, { verbose: console.log })

app.use(cors())
app.use(express.json())

const getMuseums = db.prepare(`
SELECT * FROM museums;
`)

const getWorks = db.prepare(`
SELECT * FROM works;
`)

const getPiecesInMuseums = db.prepare(`
SELECT * FROM works WHERE museumsId=@museumsId;
`)

const getMuseumById = db.prepare(`
SELECT * FROM museums WHERE id=@id;
`)

const getWorksById = db.prepare(`
SELECT * FROM works WHERE id=@id;
`)

const createNewMuseum = db.prepare(`
INSERT INTO museums (name,location) VALUES (@name,@location);
`)

app.get('/', (req, res) => {
  res.send(`
      <h1>🧑‍🎨🖼️Hello to the world of art 🖼️🧑‍🎨</h1>
      <ul>
        <li>
          <a href='/museums'>Museums</a>
        </li>
        <li>
          <a href='/works'>Works</a>
        </li>
      </ul>
    `)
})

app.get('/museums', (req, res) => {
  const museums = getMuseums.all()

  for (let njeMuzeum of museums) {
    njeMuzeum.pieces = getPiecesInMuseums.all({ museumsId: njeMuzeum.id })
  }
  res.send(museums)
})

app.get('/museums/:id', (req, res) => {

  const muzeum = getMuseumById.get(req.params)
  if (muzeum) {
    muzeum.pieces = getPiecesInMuseums.all({ museumsId: muzeum.id })
    res.send(muzeum)
  } else {
    res.status(404).send({ error: "Not found" })
  }
})

app.post('/museums', (req, res) => {

  let errors: string[] = []

  if (typeof req.body.name != 'string') {
    errors.push("Name not a String or Not Found")
  }

  if (typeof req.body.location != 'string') {
    errors.push("Location not a String or Not Found")
  }

  if (errors.length === 0) {
    const info = createNewMuseum.run(req.body)
    const museum = getMuseumById.get({ id: info.lastInsertRowid })
    museum.pieces = getPiecesInMuseums.all({ museumsId: info.lastInsertRowid })
    res.send(museum)
  } else {
    res.status(404).send(errors)
  }
})

app.post('/works', (req, res) => {

  let errors: string[] = []

})

app.get('/works', (req, res) => {
  const works = getWorks.all()

  for (let work of works) {
    work.muzeum = getMuseumById.all({ id: work.museumsId })
  }
  res.send(works)
})

app.get('/works/:id', (req, res) => {

  const pieces = getWorksById.get(req.params)
  if (pieces) {
    pieces.muzeum = getMuseumById.all({ id: pieces.museumsId })
    res.send(pieces)
  } else {
    res.status(404).send({ error: "Not Found" })
  }
})


app.listen(port, () => {
  console.log(`We are logging in http://localhost:${port}/`)
})

