#!/bin/sh
set -e

# Default values for all environment variables used in the template
export NGINX_PORT=${NGINX_PORT:-80}
export LOG_LEVEL=${LOG_LEVEL:-warn}
export KEEPALIVE_TIMEOUT=${KEEPALIVE_TIMEOUT:-65}
export CLIENT_MAX_BODY_SIZE=${CLIENT_MAX_BODY_SIZE:-20M}
export GZIP_COMP_LEVEL=${GZIP_COMP_LEVEL:-6}
export RATE_LIMIT_MEMORY=${RATE_LIMIT_MEMORY:-10m}
export UNAUTHORIZED_RATE_LIMIT=${UNAUTHORIZED_RATE_LIMIT:-10r/m}
export AUTHORIZED_RATE_LIMIT=${AUTHORIZED_RATE_LIMIT:-60r/m}
export GLOBAL_RATE_LIMIT=${GLOBAL_RATE_LIMIT:-30r/m}
export AUTHORIZED_BURST=${AUTHORIZED_BURST:-10}
export BACKEND_HOST=${BACKEND_HOST:-backend}
export BACKEND_PORT=${BACKEND_PORT:-8080}
export BACKEND_MAX_FAILS=${BACKEND_MAX_FAILS:-3}
export BACKEND_FAIL_TIMEOUT=${BACKEND_FAIL_TIMEOUT:-30s}
export BACKEND_KEEPALIVE_CONNECTIONS=${BACKEND_KEEPALIVE_CONNECTIONS:-32}
export BACKEND_KEEPALIVE_REQUESTS=${BACKEND_KEEPALIVE_REQUESTS:-100}
export BACKEND_KEEPALIVE_TIMEOUT=${BACKEND_KEEPALIVE_TIMEOUT:-60s}
export INTERNAL_AUTH_PORT=${INTERNAL_AUTH_PORT:-8081}
export PROXY_CONNECT_TIMEOUT=${PROXY_CONNECT_TIMEOUT:-30s}
export PROXY_SEND_TIMEOUT=${PROXY_SEND_TIMEOUT:-30s}
export PROXY_READ_TIMEOUT=${PROXY_READ_TIMEOUT:-30s}

echo "Starting nginx with environment variable substitution..."

# Ensure directories exist
mkdir -p /etc/nginx/conf.d

# Remove default nginx configuration that conflicts with ours
rm -f /etc/nginx/conf.d/default.conf

# Substitute environment variables in the template
echo "Substituting environment variables in nginx.conf.template..."
envsubst '${NGINX_PORT}
${LOG_LEVEL}
${KEEPALIVE_TIMEOUT}
${CLIENT_MAX_BODY_SIZE}
${GZIP_COMP_LEVEL}
${RATE_LIMIT_MEMORY}
${UNAUTHORIZED_RATE_LIMIT}
${AUTHORIZED_RATE_LIMIT}
${GLOBAL_RATE_LIMIT}
${AUTHORIZED_BURST}
${BACKEND_HOST}
${BACKEND_PORT}
${BACKEND_MAX_FAILS}
${BACKEND_FAIL_TIMEOUT}
${BACKEND_KEEPALIVE_CONNECTIONS}
${BACKEND_KEEPALIVE_REQUESTS}
${BACKEND_KEEPALIVE_TIMEOUT}
${INTERNAL_AUTH_PORT}
${PROXY_CONNECT_TIMEOUT}
${PROXY_SEND_TIMEOUT}
${PROXY_READ_TIMEOUT}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/nginx.conf

echo "Environment variable substitution completed."

# Test the nginx configuration
echo "Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "Nginx configuration test passed. Starting nginx..."
    # Start nginx in the foreground
    exec nginx -g 'daemon off;'
else
    echo "Nginx configuration test failed. Exiting."
    exit 1
fi 