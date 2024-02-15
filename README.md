# Comparing Typescript logging solutions

This repo is meant to demonstrate the capabilities of `pino`, `winston`, and `tslog` within a microservice environment. Each logger is set up to run in either "basic" mode (logger is instantiated with only the default options for the package) or "custom" mode (logger is instantiated with custom options that enable some preferred best practices).

## Setup

* Clone the repo: `git clone git@github.com:zackmiller/logger-comparison.git`
* Switch to the project directory: `cd logger-comparison`
* Install dependencies: `npm i`

## Usage

* Start the server: `npm run start`
* In a browser, navigate to any route with the format `http://localhost:3000/<logger>/<mode>/`
    * Where `<logger>` is one of: `pino | winston | tslog`
    * Where `<mode>` is one of: `basic | custom`
* View the log output in your console terminal