# Keyboard Firmware Builder

## Setup

To set up the project for development, run `npm install` in the root of the project to install dependencies.

Create a `local.json` file in `src/const`, in the format:

    {
		"API": "URL to server /build route",
		"PRESETS": "URL to static/presets folder"
	}

## Compiling

To compile, run `npm run build`.

## Deploying

To deploy a production version of the application, run `npm run deploy`.

## Testing on localhost - For developers

## Running
**Note**: This will ONLY work on OSX and Linux systems! It is not configured to work with Windows.

Make sure you have `node` and `npm`installed, along with any other dependencies they may have.

Create a `local.json` file in `src/const`, in the format:

    {
        "API": "",
        "PRESETS": "presets/"
    }

(Copy any qmkbuilder format jsons you have into ``server/presets``)

For testing 

Go into the `server` directory and install dependencies and start the API server:
```
npm install
npm run build
node index.js
```

Then, go into the `static` directory and start a web server:

*Python 3.x*:
```
python -m http.server 8080
```

*Python 2.x*:
```
python -m SimpleHTTPServer 8080
```

Then, access the GUI from `http://localhost:8080`.