import React, {Component} from 'react';
import Routes from './routes'
import {YellowBox}from 'react-native'

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])
export default () => <Routes/>