import { Personal } from '../models/Personal.js'

export const personalIndex = async (req, res) => {
  try {
    const personals = await Personal.findAll()
    res.status(200).json(personals)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const personalDestaques = async (req, res) => {
  try {
    const personals = await Personal.findAll({ where: { destaque: true } })
    res.status(200).json(personals)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const PersonalDestaca = async (req, res) => {
  const { id } = req.params

  try {
    const personal = await Personal.findByPk(id)
    await Personal.update({ destaque: !personal.destaque }, { where: { id } })
    res.status(200).json(personal)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const personalCreate = async (req, res) => {
  const { nome, cref, cpf, treino, descricao, local, foto } = req.body

  if (!nome || !cref || !cpf || !treino || !descricao || !local || !foto) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const personal = await Personal.create({
      nome, cref, cpf, treino, descricao, local, foto
    });
    res.status(201).json(personal)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const personalDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await Personal.destroy({ where: { id } });
    res.status(200).json({ msg: "Ok! Removido com Sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const personalShow = async (req, res) => {
  const { id } = req.params

  try {
    const personal = await Personal.findByPk(id)
    res.status(200).json(personal)
  } catch (error) {
    res.status(400).send(error)
  }
}