import { Router } from "express"
import { clienteCreate, clienteIndex, clienteLogin } from "./controllers/clienteController.js"
import { personalCreate, personalDestaca, personalDestaques, personalIndex, personalShow } from "./controllers/personalController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoPersonal, avaliacaoGraphDias, avaliacaoGraphEstrelas, avaliacaoIndex, dadosGerais } from "./controllers/avaliacaoController.js"

const router = Router()

router.get('/clientes', clienteIndex)
      .post('/clientes', clienteCreate)
      .post('/login', clienteLogin)

router.get('/personal', personalIndex)
      .get('/personal/destaques', personalDestaques)
      .post('/personal', personalCreate)
      .get('/personal/:id', personalShow)
      .patch('/personal/destaca/:id', personalDestaca)

router.get('/avaliacao', avaliacaoIndex)
      .post('/avaliacao', avaliacaoCreate)
      .delete('/avaliacao/:id', avaliacaoDestroy)
      .get('/avaliacao/graph', avaliacaoGraphEstrelas)
      .get('/avaliacao/graph_dias', avaliacaoGraphDias)
      .get('/avaliacao/filme/:filme_id', avaliacaoPersonal)

router.get('/dados_gerais', dadosGerais)

export default router