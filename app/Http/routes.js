'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'HomeController.index').as('home')

Route.get('login', 'HomeController.index')

Route.get('feed', 'FeedController.index').as('feed') // if you are using routes

Route.on('/projects').render('project-ashwin.project-feed') // if you are using simple views
Route.on('/comments').render('project-ashwin.comments')
Route.on('/posts').render('project-ashwin.posts')
Route.post('login', 'AuthController.login')
Route.post('register', 'RegisterController.register').as('register')

Route.get('logout', 'AuthController.logout').as('logout')

// Secured Routes under Auth Middleware //
Route.group('secured', function () {
  Route.resource('profile', 'ProfileController')
    .only(['index', 'store'])

  Route.resource('feed', 'FeedController')
    .only(['index', 'store'])
})
.middleware('web')
