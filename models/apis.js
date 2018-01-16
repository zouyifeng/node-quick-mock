const db = require('../db')
const Sequelize = require('sequelize')

const Apis = db.define('apis', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  desc: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  project_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

function addApi(api) {
  return Apis.create({
    name: api.name,
    desc: api.desc,
    content: api.content,
    project_id: api.projectId,  
    url: api.url
  })
}

function selectAllApi(id) {
  return Apis.findAll({
    where: {
      project_id: id
    }, 
    raw: true 
  })
}

function deleteApi(id) {
  return Apis.destroy({
    where: { id: id }
  })
}

function deleteProjectApis (projectId) {
  return Apis.destroy({
    where: { project_id: projectId }
  })
}

module.exports = {
  addApi,
  selectAllApi,
  deleteApi
}