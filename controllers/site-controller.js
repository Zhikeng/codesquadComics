const data = require('../data/data');
const newArray = [];
const Comic = require('../models/comic-model')
const User = require('../models/user-model')
const passport = require('passport')


function totalPublisher() {
  for (let i = 0; i < data.length; i++) {
    if (newArray.indexOf(data[i].publisher) < 0) {
      newArray.push(data[i].publisher);
    }
  }
  return newArray.length;
}

const totalPub = totalPublisher();

module.exports = {
  index: async function (request, response) {
      await Comic.find().then(function (foundBook) {
        response.render('pages/index', {
          inventoryArray: foundBook,
        })
      }).catch(function (error) {
        console.log(error)
      })
      // response.send("This route points to the Home page")
  },
  about: (request, response) => {
    response.render('pages/about', {
      inventoryArray: data,
      totalPub: totalPub
    })
    response.send("This route points to the About page")
  },
  register_get: (request, response) => {
    response.render('pages/register')
  },
  register_post:(request,response) => {
    User.register( { username: request.body.username}, request.body.password, (error,user) => {
      if(error) {
        console.log(error)
        response.redirect('/register')
      } else {
        passport.authenticate('local')(request, response, () => {
          response.redirect('/')
        })
      }
    })
  },
  login_get: (request, response) => {
    response.render('pages/login')
    response.send("This route points to the Login page")
  },
  login_post: (request, response) => {
    const user = new User({
      username: request.body.username,
      password: request.body.password
    })
    request.login(user, (error) => {
      if (error) {
        return error
      } else {
        passport.authenticate('local')(request, response, () => {
          response.redirect('/')
        })
      }
    })
  },
  logout: (request, response) => {
    request.logout(function (error) {
      if (error) {
        return next(error)
      } else {
        response.redirect('/')
      }
    })
  },
  google_get: passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }),
  google_redirect_get: [
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (request, response) {
      response.redirect('/admin-console')
    }
  ]
}