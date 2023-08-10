# frontend-meldingsplichtige-api

This web application is used for testing the process of creating and submitting
automatic submissions for the Loket stack. You can also create a manual
submission if needed.

## Run this in the stack

Look at the information below if you don't already have experience with Ember
webapps. You will also need the [app-meldingsplichtige-api
stack](https://github.com/lblod/app-meldingsplichtige-api) running to be able
to use this application. Then use

```bash
ember serve --proxy http://localhost/ --port <<desired port>>
```

where "localhost" is where the stack is running, to run this application.

# Ember app details

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd frontend-meldingsplichtige-api`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at
  [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more
details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

No specifications about deployment yet

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for
    chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for
    firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
