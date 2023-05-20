// const data = require('../data/data');
// const { v4: uuid } = require('uuid');
const Comic = require('../models/comic-model')

module.exports = {
  detail: async function (request, response) {
    // let id = request.params._id;
    const { _id } = request.params;
    await Comic.findOne({ _id: _id }).then(function (foundBook) {
      response.render('pages/book', {
        foundBook: foundBook
      })
    }).catch(function (error) {
      console.log(error)
    })
    // const foundBook = data.find(book => book._id === String(_id));
  },
  create: (request, response) => {
    console.log(request.body);
    const { title, author, publisher, genre, number_of_pages, starRating, synopsis, image } = request.body;
    const newComic = new Comic({
      title: title,
      author: author,
      publisher: publisher,
      genre: genre,
      number_of_pages: number_of_pages,
      starRating: starRating,
      synopsis: synopsis,
      image: image
    })

    newComic.save()

    response.redirect("/admin-console")
    // const { _id = uuid(), image, title, author, publisher, genre, pages, rating, synopsis } = request.body;
    // data.push({ _id, image, title, author, publisher, genre, pages, rating, synopsis });
    // if (title != "") {
    //   response.redirect("/admin-console");
    // } else {
    //   response.redirect("/admin-console/create-book");
    // }
  },
  update: async function (request, response) {

    const { _id } = request.params;

    const { title, author, publisher, genre, number_of_pages, starRating, synopsis, image } = request.body;

    await Comic.findByIdAndUpdate({ _id: _id }, {
      $set: {
        title: title,
        author: author,
        publisher: publisher,
        genre: genre,
        number_of_pages: number_of_pages,
        starRating: starRating,
        synopsis: synopsis,
        image: image
      }
    }, { new: true }).then(function () {
      response.redirect("/admin-console")
    }).catch(function (error) {
      console.log(error)
    })
    // const foundBook = data.find(book => book._id === String(_id));

    // foundBook.image = image;
    // foundBook.title = title;
    // foundBook.author = author;
    // foundBook.publisher = publisher;
    // foundBook.genre = genre;
    // foundBook.pages = pages;
    // foundBook.rating = rating;
    // foundBook.synopsis = synopsis;
  },
  delete: async function (request, response) {
    const { _id } = request.params;
    await Comic.deleteOne({ _id: _id }).then(function () {
      response.redirect("/admin-console")
    }).catch(function (error) {
      console.log(error)
    })
  }
  // const foundBook = data.find(book => book._id === String(_id));
  // const index = data.indexOf(foundBook);
  // data.splice(index, 1);
}



