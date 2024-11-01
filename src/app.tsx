import { RJSFSchema } from "@rjsf/utils";
import { Col, Container, Row } from "react-bootstrap";
import Intro from "./components/Intro";
import formSchemas from "./assets/forms.json";
import WizardForm from "./components/WizardForm";
import validator from "@rjsf/validator-ajv8";
import { useState } from "react";

export default function App() {
  const [forms] = useState<RJSFSchema[]>(
    formSchemas as unknown as RJSFSchema[]
  );

  // Not yet used but very likely to be used in the future.
  const [, setFormData] = useState({});
  const [activeForm, setActiveForm] = useState<RJSFSchema | null>(null);
  let formsMenu = [{ id: 0, title: "No Form template found." }];

  if (forms.length > 0) {
    formsMenu = (forms as RJSFSchema[]).map((item, index) => {
      return { id: index, title: item.title ?? "No form title" };
    });
  }

  const onFormSubmit = (index: number, data?: any) => {
    setFormData((prevData) => ({ ...prevData, [index]: data ?? null }));
    setActiveForm(null);
  };

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} className="">
          {activeForm ? (
            <WizardForm
              id={activeForm.id}
              schema={activeForm}
              uiSchema={{}}
              formData={{}}
              onSubmit={onFormSubmit}
              onCancel={onFormSubmit}
              validator={validator}
            />
          ) : (
            <Intro
              forms={formsMenu}
              onStart={(id: number) => setActiveForm(forms[id])}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
