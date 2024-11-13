import { Card, Button, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function ({
  forms,
  onStart,
}: {
  forms: { id: number; title: string }[];
  onStart: (index: number) => void;
}) {
  const { t, i18n } = useTranslation();
  console.log(i18n);
  return (
    <Card style={{ minHeight: "300px" }}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="d-flex flex-row justify-content-between align-items-top mb-2">
          <Card.Title>{t("cardTitle")}</Card.Title>
          <LanguageSwitcher />
        </div>

        <div className="mb-4">
          <p>{t("description1")}</p>
          <p>{t("description2")}</p>
          <ul>
            <li>
              {" "}
              <a
                href="https://www.rijksoverheid.nl/documenten/rapporten/2023/07/11/onderzoekskader-algoritmes-adr-2023#:~:text=De%20Auditdienst%20Rijk%20heeft%20een,risico%27s%20beheerst%20%5C(kunnen%5C)%20worden."
                target="_blank"
              >
                {t("framework1_text")}
              </a>{" "}
              {t("framework1_author")}
            </li>
            <li>
              {" "}
              <a
                href="https://minbzk.github.io/Algoritmekader/"
                target="_blank"
              >
                {t("framework2_text")}
              </a>{" "}
              {t("framework2_author")}
            </li>
            <li>
              {" "}
              <a
                href="https://www.rijksoverheid.nl/documenten/rapporten/2021/02/25/impact-assessment-mensenrechten-en-algoritmes"
                target="_blank"
              >
                {t("framework3_text")}
              </a>{" "}
              {t("framework3_author")}
            </li>
          </ul>
          <p>
            {t("feedback")}{" "}
            <a
              href="https://github.com/NGO-Algorithm-Audit/AlgorithmAudit_website"
              target="_blank"
            >
              Github
            </a>{" "}
            {t("or")}{" "}
            <a href="mailto:info@algorithmaudit.eu">info@algorithmaudit.eu</a>.
          </p>
        </div>

        <ListGroup>
          {forms.map((form) => (
            <ListGroup.Item
              key={form.id}
              className="d-flex flex-row justify-content-between align-items-center"
            >
              <p className="m-0 mr-4">{form.title}</p>
              <Button variant="primary" onClick={() => onStart(form.id)}>
                {t("startButton")}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
