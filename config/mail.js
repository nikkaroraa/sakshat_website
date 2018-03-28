'use strict'

const Env = use('Env')

module.exports = {
/*
|--------------------------------------------------------------------------
| Connection
|--------------------------------------------------------------------------
|
| Connection to be used for sending emails. Each connection needs to
| define a driver too.
|
*/
driver: Env.get('MAIL_CONNECTION', 'smtp'),

/*
|--------------------------------------------------------------------------
| SMTP
|--------------------------------------------------------------------------
|
| Here we define configuration for sending emails via SMTP.
|
*/
smtp: {
service:'Zoho',
driver: 'smtp',
pool: true,
port: 587,
host: 'smtp.zoho.com',
secure: false,
auth: {
user: Env.get('MAIL_USERNAME'),
pass: Env.get('MAIL_PASSWORD')
},
maxConnections: 5,
maxMessages: 100,
rateLimit: 10
}

}
