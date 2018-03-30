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


Route.post('login', 'AuthController.login')
Route.get('/abc', 'PostsController.index')
Route.post('register', 'RegisterController.register').as('register')

Route.get('logout', 'AuthController.logout').as('logout')
//facebook login
Route.get('facebookLogin', 'AuthController.redirect')
Route.get('facebookAuthenticated', 'AuthController.handleCallback')
Route.get('test-url', 'AuthController.testUrl')
//mail test
Route.get('mail-test', 'MailController.textMsg')

// Secured Routes under Auth Middleware //
Route.group('secured', function () {
  Route.resource('profile', 'ProfileController')
    .only(['index', 'store'])
    .addCollection('about', 'POST', (collection) => {
      collection.bindAction('ProfileController.editAbout')
    })
    .addCollection('updateCoverImage', 'POST', (collection) => {
      collection.bindAction('ProfileController.updateCoverImage')
    })
    .addCollection('updateProfileImage', 'POST', (collection) => {
      collection.bindAction('ProfileController.updateProfileImage')
    })

  Route.resource('feed', 'FeedController')
    .only(['index', 'store'])
    .addCollection('add', 'POST', (collection) => {
      collection.bindAction('FeedController.addPost')
    })

  Route.resource('organisation', 'OrganisationController')
    .only(['index', 'store'])
    .addCollection('add', 'GET', (collection) => {
      collection.bindAction('OrganisationController.addOrganisation')
    })
    .addCollection('addPost', 'POST', (collection) => {
      collection.bindAction('OrganisationController.addPostOrganisation')
    })

  Route.get('projects', 'ProjectController.getProjects')

  Route.resource('project', 'ProjectController')
    .only(['index', 'store'])
    .addCollection('add', 'GET', (collection) => {
      collection.bindAction('ProjectController.addProject')
    })
    .addCollection('addPost', 'POST', (collection) => {
      collection.bindAction('ProjectController.addPostProject')
    })
    .addCollection(':id', 'GET', (collection) => {
      collection.bindAction('ProjectController.viewProject')
    })


  Route.resource('comments', 'CommentController')
    .only([])
    .addCollection('postComments/add', 'POST', (collection) => {
      collection.bindAction('CommentController.addPostComments')
    })

}).middleware('web')
