
const db = require('../db')
const Sequelize = require('sequelize')

const Projects = db.define('projects', {
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
  url: {
    type: Sequelize.STRING,
    allowNull: false    
  },
  state: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

function addProject(project) {
  return  Projects.create({
      name: project.name,
      desc: project.desc,
      url: project.url
  })
}

function selectOneProject (id) {
  return Projects.findOne({
    where: { id: id },
    raw: true
  })
}

function selectAllProject() {
  return Projects.findAll({ raw: true })
}

function deleteProject(id) {
  return Projects.destroy({
    where: { id: id }
  })
}

module.exports = {
  addProject,
  selectAllProject,
  deleteProject,
  selectOneProject
}
