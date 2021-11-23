//knex queries
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Ll621312608',
        database: 'web2'
    }
})

module.exports = {
    add,
    find,
    upd,
    remove
}

//create
async function add(entry) {
    var [id] = await knex('city').max('ID')
    var string = JSON.stringify(id)
    var json = JSON.parse(string)
    
    const entryWithId = {
        ID: parseInt(string.slice(13,30)) + 1,
        Name: entry.Name,
        CountryCode: entry.CountryCode,
        District: entry.District,
        Population: entry.Population
    }
    const [ result ] = await knex('city').insert(entryWithId)
    return result
}

//read
function find(name) {
    return knex('city').select('Name', 'CountryCode', 'District', 'Population').where({ Name: name })
}

//update
function upd(name, newPopulation) {
    return knex('city')
    .where({ Name: name })
    .update(newPopulation)
    .then(() => {
        return find(name)
    })
} 

//delete
function remove(id) {
    return knex('city')
    .where({ id })
    .del()
}
