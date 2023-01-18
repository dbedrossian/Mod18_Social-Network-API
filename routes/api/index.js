const router = require('express').Router();
const friendsRoutes = require('./friendsRoutes');
const reactionsRoutes = require('./reactionsRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/reactions', reactionsRoutes);
router.use('/friends', friendsRoutes);

module.exports = router;