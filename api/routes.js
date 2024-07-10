import { Router } from "express"
import { clienteCreate, clienteIndex, clienteLogin } from "./controllers/clienteController.js"
import { personalCreate, personalDestaca, personalDestaques, personalIndex, personalShow } from "./controllers/personalController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoPersonal, avaliacaoGraphDias, avaliacaoGraphEstrelas, avaliacaoIndex, dadosGerais } from "./controllers/avaliacaoController.js"
import {Alteracao} from "../front_admin/app/altera/id/page.jsx"

const router = Router()

router.get('/clientes', clienteIndex)
      .post('/clientes', clienteCreate)
      .post('/login', clienteLogin)

router.get('/personals', personalIndex)
      .get('/personals/destaques', personalDestaques)
      .post('/personals', personalCreate)
      .get('/personals/:id', personalShow)
      .patch('/personals/destaca/:id', personalDestaca)
      .put('/personals/:id', Alteracao)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)
      .get('/avaliacoes/graph', avaliacaoGraphEstrelas)
      .get('/avaliacoes/graph_dias', avaliacaoGraphDias)
      .get('/avaliacoes/personal/:personal_id', avaliacaoPersonal)

router.get('/dados_gerais', dadosGerais)

export default router