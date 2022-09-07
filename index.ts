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
    res.send(museums)
})

app.get('/works', (req, res) => {
    const works = getWorks.all()
    res.send(works)
})


app.listen(port, () => {
    console.log(`We are logging in http://localhost:${port}/`)
})