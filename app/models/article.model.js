module.exports = (sequelize, Sequelize) => {
    
    // 4
    // This Sequelize Model represents tutorials table in PostgreSQL database.
    // These columns will be generated automatically: id, title, description, published, createdAt, updatedAt.
    const Article = sequelize.define("article", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Article;
}

/* create a new Tutorial: create(object)
find a Tutorial by id: findByPk(id)
get all Tutorials: findAll()
update a Tutorial by id: update(data, where: { id: id })
remove a Tutorial: destroy(where: { id: id })
remove all Tutorials: destroy(where: {})
find all Tutorials by title: findAll({ where: { title: ... } }) */