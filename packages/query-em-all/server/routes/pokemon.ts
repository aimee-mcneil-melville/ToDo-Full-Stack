import request from 'superagent'
import express from 'express'
import { Pokemon, PokemonGeneration } from '../../models/pokemon.ts'

const router = express.Router()

router.get('/generation/:generation', async (req, res) => {
  const generation = Number(req.params.generation)

  if (isNaN(generation) || generation < 1 || generation > 9) {
    return res.sendStatus(400)
  }

  try {
    const response = await request.get(
      `https://pokeapi.co/api/v2/generation/${generation}`
    )

    const species = response.body.pokemon_species as {
      name: string
      url: string
    }[]

    const pokemon = species
      .map((p) => ({
        name: p.name,
        id: Number(p.url.split('/')[6]),
      }))
      .sort((a, b) => Number(a.id) - Number(b.id))
    const region = response.body.main_region.name
    const name = response.body.name

    return res.json({
      generation: {
        pokemon,
        region,
        name,
      },
    } as { generation: PokemonGeneration })
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'Not Found') {
        return res.status(404).send(err.message)
      }
      res.status(500).send(err.message)
    } else {
      res.sendStatus(500)
    }
  }
})

router.get('/:name', async (req, res) => {
  const name = req.params.name

  try {
    const response = await request.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    )

    return res.json({ pokemon: response.body } as { pokemon: Pokemon })
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'Not Found') {
        return res.status(404).send(err.message)
      }
      res.status(500).send(err.message)
    } else {
      res.sendStatus(500)
    }
  }
})

export default router
