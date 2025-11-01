import { Card, Button, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function ({
  forms,
  onStart,
  activeLanguage = false,
}: {
  forms: { id: number; title: string }[];
  onStart: (index: number) => void;
  activeLanguage?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Card style={{ minHeight: "300px" }}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="d-flex flex-row justify-content-between align-items-top mb-2">
          <Card.Title>{t("cardTitle")}</Card.Title>
          {!activeLanguage && <LanguageSwitcher />}
        </div>
        <div className="mb-4">
          <h3>
            <b>{t("Title")}</b>
          </h3>
          <br />
          <p>
            <h5>
              <b>{t("bold1")}</b>
            </h5>
            {t("description4")}
          </p>
          <p>
            <h5>
              <b>{t("bold3")}</b>
            </h5>
            {t("description7")}
          </p>
          <p>{t("description8")}</p>
          <p>
            <i>
              {t("feedback_0")}
              <a
                href="https://algorithmaudit.eu/technical-tools/implementation-tool/#tool"
                target="_blank"
              >
                {t("feedback_AA")}
              </a>
              {t("feedback")}
            </i>
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
