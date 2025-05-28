![GitHub last commit](https://img.shields.io/github/last-commit/danae/transliterate)
![GitHub License](https://img.shields.io/github/license/danae/transliterate)

# Transliterate

**This repository contains the source code for the Transliterate app, which contains tools for transliterating constructed scripts mapped to the Unicode Private Use Area.**

## Installation

The provided [Dockerfile](Dockerfile) builds an image that serves the app using NodeJS. An image from this Dockerfile will be built and published to the GitHub Container Registry on every push or pull request using a [GitHub action](.github/workflows/docker-publish.yml).

You can pull the current version of the image with the following command:

```bash
$ docker pull ghcr.io/danae/transliterate:master
```

Other versions of the package can be found [here](https://github.com/danae/transliterate/pkgs/container/transliterate).

## Local development

Install Node.js and npm, then run the following commands to install the dependencies and serve the app in a development server that watches for file changes using [Nodemon](https://nodemon.io/):

```bash
$ npm install
$ npm run dev
```

## License

This package is licensed under the GNU LGPL 3.0 license. See the [license file](LICENSE.txt) for more information.
