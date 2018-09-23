# Hostmaker recruitment task

See [requirements.md](./requirements.md) for details on recruitment task.

## Solution

### Overview

I have developed solution with MySQL and Node.js in single Docker container. Used frameworks and libraries include `express`, `sequelize`.

### Minimal setup to run this repository

In POSIX-compliant shell, run following commands:

```bash
yarn; # Installs repository dependencies
npm test; # Runs unit tests
./full-build.sh; # Builds and runs container with MySQL and web service.
```

By default, application use port `8432`. Therefore, if you setup app properly, you will see basic info on URL http://localhost:8432/health

## Endpoints
Following routes are defined:

```js
    app.get('/health', routes.health);
    app.get('/property/:id', routes.property.get);
    app.post('/property', parseJson, routes.property.post);
    app.put('/property/:id', parseJson, routes.property.put);
    app.delete('/property/:id', routes.property.del);
```

## Integration tests

I decided to go with integration tests to complete task before deadline.

Running shell command
```bash
node integration-tests
```

Will run integration tests against application at `http://localhost:8432`.

Use 
```bash
node integration-tests --verbose
```

To run test suite slowly and with results.