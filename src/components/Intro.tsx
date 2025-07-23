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
          <p>
            {/* first sentence */}
            {t("description1")}
            <a
              href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
              target="_blank"
            >
              {t("AI_Act_link")}
            </a>
            {/* second sentence */}
            {t("description2")}
            {t("description3")}
            {/* third sentence */}
          </p>
          <p>
            <b>{t("bold1")}</b>
            {t("description4")}

            <b>{t("bold2")}</b>
            {t("description5")}
          </p>
          <p>
            <b>{t("bold3")}</b>
            {t("description6")}
            <b>{t("bold3")}</b>
            {t("description7")}
          </p>
          <p>
            <b>{t("subheading")}</b>
          </p>
          <p>
            {t("description8")}
            <a
              href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
              target="_blank"
            >
              {t("AI_bot_link")}
            </a>
            {t("description9")}
          </p>
          <p>
            <b>{t("feedback_PS")}</b>
            {t("feedback_0")}
            <a
              href="https://algorithmaudit.eu/technical-tools/implementation-tool/#tool"
              target="_blank"
            >
              {t("feedback_AA")}
            </a>
            {t("feedback")}{" "}
            <a href="mailto:andmed@justdigi.ee">andmed@justdigi.ee</a>.
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
