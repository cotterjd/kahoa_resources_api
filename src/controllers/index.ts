import dev from './dev'

async function list(req, res) {
  const data = await dev.get()
  res.json(data)
}

async function del(req, res) {
  const devId = Number(req.params.id)
  if (isNaN(devId)) return res.status(400).json({ error: `Passed id must be a number` })

  try {
    const data = await dev.del(devId)
    return res.json(data)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

async function create (req, res) {
  try {
    const data = await dev.create(req.body)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: `Error trying to create dev` })
  }
}

export default {
  dev: { list, del, create }
}

