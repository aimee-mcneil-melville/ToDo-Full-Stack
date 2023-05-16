import request from 'superagent'
import express from 'express'

const router = express.Router()

router.get('/pokemon/:generation', async (req, res) => {
  const generation = Number(req.params.generation)

  if (isNaN(generation) || generation < 1 || generation > 9) {
    return res.sendStatus(400)
  }

  try {
    const response = await request.get(
      `https://pokeapi.co/api/v2/generation/${generation}`
    )

    const pokemon = response.body.pokemon_species
    const region = response.body.main_region.name
    const name = response.body.name

    return res.json({
      pokemon,
      region,
      name,
    })
  } catch (err) {
    if (err instanceof Error) {
      res.sendStatus(500).send(err.message)
    } else {
      res.sendStatus(500)
    }
  }
})

router.get('/pokemon/:name', async (req, res) => {
  const name = req.params.name

  try {
    const response = await request.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    )

    return res.json(response.body)
  } catch (err) {
    if (err instanceof Error) {
      res.sendStatus(500).send(err.message)
    } else {
      res.sendStatus(500)
    }
  }
})
