const express = require('express');
const {
  fetchCity,
  cityListFetch,
  cityCreate,
  cityDelete,
} = require('./controllers');

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param('cityId', async (req, res, next, cityId) => {
  const city = await fetchCity(cityId, next);
  if (city) {
    req.city = city;
    next();
  } else {
    next({ status: 404, message: 'city Not Found!' });
  }
});

router.get('/', cityListFetch);

router.post('/', cityCreate);

router.delete('/:cityId', cityDelete);

module.exports = router;
