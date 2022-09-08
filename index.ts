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

  for (let museum of museums) {
    const works = getPiecesInMuseums.all({ museumsId: museum.id })
    museum.works = works
  }
  res.send(museums)
})

app.get('/museums/:id,', (req, res) => {

  const muzeum = getMuseumById.get(req.params)
  if (muzeum) {
    const works = getPiecesInMuseums.all({ museumsId: muzeum.id })
    muzeum.works = works
    res.send(muzeum)
  } else {
    res.status(404).send({ error: "Not found" })
  }
})

app.get('/works', (req, res) => {
  const works = getWorks.all()
  res.send(works)
})


app.listen(port, () => {
  console.log(`We are logging in http://localhost:${port}/`)
})

