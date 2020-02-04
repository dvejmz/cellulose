#!/bin/sh

set -e

npm run build
aws s3 sync ./build s3://cellulose.apps.sgfault.com
