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
        "PRESETS": "static/presets/"
    }

(Copy any qmkbuilder format jsons you have into ``server/presets``)

For testing 

``npm run build`` builds the bundle.js file automatically as new files are generated.


``npm run deploy`` is a one-time build for deployment.

*Python 3.x*:
```
python -m http.server 8080
```

*Python 2.x*:
```
python -m SimpleHTTPServer 8080
```

Then, access the GUI from `http://localhost:8080`.