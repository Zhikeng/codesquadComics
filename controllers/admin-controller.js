// const data = require('../data/data');
// const { v4: uuid } = require('uuid');
const Comic = require('../models/comic-model')

module.exports = {
    admin: async function (request, response) {
        await Comic.find().then(function (allComics) {
            response.render('pages/admin', {
                inventoryArray: allComics
            })
        }).catch(function (error) {
            console.log(error)
        })
        // response.send("This route points to the Admin Console page")
    },
    create: (request, response) => {
            response.render('pages/create')
            response.send("This route points to the Create page")
    },
    update: async function (request, response) {
            const { _id } = request.params;
            // const foundBook = data.find(book => book._id === String(_id));
            await Comic.findOne({ _id: _id }).then(function (foundBook) {
                response.render('pages/update', {
                    foundBook: foundBook
                })
            }).catch(function (error) {
                console.log(error)
            })
            // response.send("This route points to the Update page")
    }
}