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
            {/* first sentence */}
            <a
              href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
              target="_blank"
            >
              {t("AI_Act_link")}
            </a>
            {/* second sentence */}
            {t("description2")}
            <ul>
              <li>{t("prohibited")}</li>
              <li>{t("high_risk")}</li>
              <li>{t("limited_risk")}</li>
              <li>{t("general_purpose")}</li>
              <li>{t("minimal_risk")}</li>
            </ul>
            {t("description3")}
            {/* third sentence */}
          </p>
          <p>
            <h5>
              <b>{t("bold1")}</b>
            </h5>
            {t("description4")}
          </p>
          <p>
            {t("description5")}
            <b>{t("bold2")}</b>
            {t("description6")}
            <ol>
              <li>{t("interactive_pages")}</li>
              <li>{t("vestlusrobot")}</li>
              <li>{t("algoritmiregister")}</li>
              <li>{t("riskihinnangute_register")}</li>
            </ol>
          </p>
          <p>
            <h5>
              <b>{t("bold3")}</b>
            </h5>
            {t("description7")}
          </p>
          <p>
            {t("description8")}
            <b>{t("bold4")}</b>
            {t("description9")}
          </p>
          <h5>
            <b>{t("Tagasiside")}</b>
          </h5>
          <p>{t("description10")}</p>
          <p>
            {t("See")} <b>{t("bold5")}</b> {t("tagasiside_info")}
            <b>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfsc-VX64veFhhEeNZs6XrmZ9d03dJndSlBnow3Jv1zsySsRw/viewform?usp=header"
                target="_blank"
              >
                {t("kusimustiku_link")}
              </a>
            </b>
            {t("description11")}
          </p>
          <h5>
            <b>{t("bold6")}</b>
          </h5>
          <p>{t("description12")}</p>
          <p>{t("description13")}</p>
          <p>
            <b>
              <i>{t("bold7")}</i>
            </b>
            {t("description14")}
            <i>{t("cursive1")}</i>
            {t("description15")}
          </p>
          <p style={{ color: "red" }}>{t("description16")}</p>
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
