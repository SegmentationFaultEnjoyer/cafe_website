const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const webpackMiddleware = require('webpack-dev-middleware');

module.exports = {
    path, 
    express,
    webpack,
    webpackConfig,
    webpackMiddleware
};