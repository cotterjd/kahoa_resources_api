import express from 'express'
import dev from './controllers/dev'
import controller from './controllers'

const router = express.Router()

router.route(`/version`).get((req, res) => {
  res.send(require(`../package.json`).version)
})

router.route('/devs').post(controller.dev.create)
router.route('/devs').get(controller.dev.list)
router.route('/devs/:id').delete(controller.dev.del)


export default router 
