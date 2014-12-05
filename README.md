# Attempt to fix evernote next actions using checkboxes

## Developing

- Run `npm install` in this directory
- Make sure you have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed
- Create your `.env` file with your environment variables 
- Run `foreman start`

## Deploying

- Set up an account on dev.evernote.com
- Obtain api key
- In this app directory, run `heroku create` to make a new Heroku app
- Set Heroku's config variables for your new app:

```sh
$ heroku config:set ENV_KEY=ENV_VALUE
```

- Deploy to heroku:

```sh
$ git push heroku master
```

```
http://your-heroku-app.herokuapp.com/sync
```

