#!/bin/bash
yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import nodemon dotenv --prefer-offline && \
yarn add express morgan bcrypt body-parser jsonwebtoken redis pg-promise --prefer-offline && \
touch .eslintrc
