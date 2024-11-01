# AI documentation templates

Open-source templates for model documentation. Based on AI Act requirements and soft law frameworks, such as the Research framework Algorithms of the Netherlands Executive Audit Agency, the Algorithm framework of the Dutch Ministry of the Interior and the Dutch Fundamental Rights Impact Assessment (IAMA).

The templates are available in JSON format and can be easily customized to fit the specific needs of an organization.

# How to run

Follow these steps to set up and run the application on your local machine.

## Prerequisites
Ensure the following are installed on your system:

Node.js (version 14 or later)
npm (Node Package Manager, comes with Node.js) or yarn (an alternative package manager)
To check if you have these installed, run the following commands in your terminal:

```bash
node -v
npm -v
```

First, clone the repository to your local machine. Open your terminal and run:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

Once inside the project directory, install the necessary packages by running:

```bash
# If you use npm
npm install

# Or, if you prefer yarn
yarn install
```

After the dependencies are installed, start the development server with:

```bash
# If using npm
npm start

# Or, if using yarn
yarn start
```

This command will compile and serve the application. By default, it should be accessible at http://localhost:5173 in your web browser.

# How it works.

This implementation extends the [React JSON Schema Form (RJSF) library](https://github.com/rjsf-team/react-jsonschema-form) to create a step-by-step wizard interface. Instead of displaying all form fields at once, it presents them one at a time, with validation and navigation controls.

The original specification is still applicable so please read the [RSJF documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) for information about how the forms work.

Changes we made to the original specification:

### 1. Multi form support

To show multiple forms on the starting page, we always place our form specifications inside an array. [See our forms](./src/assets/forms.json)

### 2. Output

The templates should return an outcome after the questions, to show this result we trigger the results component when the question key is `output`. For example:

```json
"output": {
    "type": "string",
    "title": "Uitslag",
    "default": "Uw toepassing is op basis van uw antwoorden waarschijnlijk een impactvol algoritme."
}
```

This allows us to have multiple different outcomes in one template that each are triggered based on a unique combination of dependencies.

In case a form ends without an `output` question we automatically trigger an error component.

### 3. uiSchema integration

To simplify importing the json templates into our front-end we specificy our [uiSchema](https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema) inside the original [object properties](https://rjsf-team.github.io/react-jsonschema-form/docs/json-schema/objects)

Example:

```json
{
    "title": "Hello World",
    "type": "object",
    "required": ["question1"],
    "properties": {...},
    "dependencies": {...},
    "uiSchema": {
        "question1": {
            "ui:autofocus": true
        }
    }
}
```

# Styling overrides

With these css variables defined in the root where the frontend is injected the default theming can be overriden.

```css
:root {
  --host-primary: #4caf50;
  --host-primary-dark: #388e3c;
  --host-primary-darker: #2e7d32;
  --host-body-bg: #e8f5e9;
}
```
