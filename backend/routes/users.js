var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    console.log(e)
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  const user = new User(req.body)
  try {
      await user.save()
      res.status(201).send(user)
  } catch(error){
      res.status(400).send(error)
  }
});


router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'id']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      const user = await User.findOne({id: req.params.id})

      if (!user) {
          return res.status(404).send()
      }

      updates.forEach((update) => user[update] = req.body[update])
      await user.save()

      res.send(user)
  } catch (e) {
      res.status(400).send(e)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id})

    if (!user) {
        res.status(404).send()
    }

    res.send(user)
} catch (e) {
    res.status(500).send()
}
})

module.exports = router;
