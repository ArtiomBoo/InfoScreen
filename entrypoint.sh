#!/bin/sh

echo "Injecting environment variables..."

envsubst < /usr/share/nginx/html/assets/env.js > /usr/share/nginx/html/assets/env.js.tmp
mv /usr/share/nginx/html/assets/env.js.tmp /usr/share/nginx/html/assets/env.js

exec "$@"
