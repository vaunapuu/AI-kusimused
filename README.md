# AI Act Implementation Tool

Opinionated implementation of [AI act questions](https://github.com/NGO-Algorithm-Audit/AI-Act-Questions) created by the Algorithm Audit team in collaboration with the muncipality of Amsterdam.

# How to run

This project includes a Git submodule that references the JSON Schemas repository (LINK), allowing us to keep schema definitions separate while using them within this project. Follow these steps to setup everything correctly.

## Prerequisites

Ensure the following are installed on your system:

Node.js (version 14 or later)
npm (Node Package Manager, comes with Node.js) or yarn (an alternative package manager)
To check if you have these installed, run the following commands in your terminal:

```bash
node -v
npm -v
```

##### 1. Clone the repository to your local machine. Open your terminal and run:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

##### 2. JSON Schemas Submodule

```bash
# If you’re cloning this repository for the first time, or if you haven't initialized the submodule yet
git submodule update --init --recursive

# To update the submodule from the remote.
git submodule update --remote --merge
```

##### 3. Once inside the project directory, install the necessary packages by running:

```bash
# If you use npm
npm install

# Or, if you prefer yarn
yarn install
```

##### 4. After the dependencies are installed, start the development server with:

```bash
# If using npm
npm run dev

# Or, if using yarn
yarn dev
```

This command will compile and serve the application. By default, it should be accessible at http://localhost:5173 in your web browser.

# How it works.

The actual form schema's are specified in [AI act questions repository.](https://github.com/NGO-Algorithm-Audit/AI-Act-Questions) And this repository is used as a git sub module in this repository.

This rendering implementation extends the [React JSON Schema Form (RJSF) library](https://github.com/rjsf-team/react-jsonschema-form) to create a step-by-step wizard interface. Instead of displaying all form fields at once, it presents them one at a time, with validation and navigation controls.

The original specification is still applicable so please read the [RSJF documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) for information about how the forms work.

Changes we made to the original specification:

### 1. Output

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

### 2. Intermediate output

To show intermediate outputs or simple text messages to the user we trigger a classname on such elements, to prevent the content from rendering as an input. This is done by adding the following uiSchema definition:

```json
"outputIntermediate": {
    "ui:widget": "textarea",
    "ui:classNames": "intermediate-output"
}
```

In this example we trigger this for the input element `outputIntermediate` but this mechanism can be used for any question.

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
