import express from 'express'
import controller from './controllers'

const router = express.Router()

router.route(`/version`).get((req, res) => {
  res.send(require(`../package.json`).version)
})

router.route('/devs').post(controller.dev.create)
router.route('/devs').get(controller.dev.list)
router.route('/devs/:id').put(controller.dev.update)
router.route('/devs/:id').delete(controller.dev.del)

router.route('/login').post(controller.auth.login)

export default router
