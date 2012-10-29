## What's this?

delayme is a webserver that serves the static files with a specified delay
(for ex: localhost:3000/resources/script.js?delay=3000 loading script.js with 3 sec delay)

## Requirements

- Node.js > 0.6.x

## How to?

node index.js
// that will start the server on port 3000

Try to include http://localhost:3000/resources/script.js?delay=10000 into your
webpage in the HEAD tag.

## Licence

MIT
