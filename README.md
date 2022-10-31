# Veeam Form generation from JSON

## Supported JSON format

```typescript
{
    title: string, // title of the form

    // action buttons
    actions: {
        label: string, // label on the button
        name: string, // unique name of the action
        type: "default" // type of the button
    }[],

    // form fields
    fields: (
        // input-like fields
        {
            label: string, // label of the field
            name: string, // unique name  of the field
             // type of the field
            type: "number" | "input" | "textarea" | "date"
        }
        // group fields
        | {
            // label of the field, optional
            // bcz it might have only one option
            // e.g. Agree with Terms and Conditions
            label?: string,
            name: string, // unique name of the group field
            type: "checkbox" | "radio",  // type of the group field
            // options of the group field
            options: {
                label: string, // label of the option
                value: string // value of the option
            }[]
        })[]
}
```

## User Features

- Form generation supports numeric, text, multiline, date, checkbox and radio fields
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) is used as a JSON input with validation and code highlighting features
- JSON configuration is validated by [JSON Schema](https://json-schema.org/)
- Option to prefill the JSON input by the predefined configuration
- Option to cancel last JSON input changes
- Configuration tab broadcasts a status of the JSON input and validation

## Technical Features

- Type generation from a JSON Schema
- The core of the application follows declarative principles for easy schema extention
- Error handling for invalid JSON input, JSON parsing, validation bypass and runtime form generation
- Automatic deploy to Microsoft Azure on `main` branch push

## Start the app

### `npm start`

Generates TypeScript types from a JSON Schema and runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Generates TypeScript types from a JSON Schema and builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
