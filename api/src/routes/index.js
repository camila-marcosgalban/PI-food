const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require('./recipes.js');
const typesRouter = require('./types.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);
router.use('/types', typesRouter)

module.exports = router;
