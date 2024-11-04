import { Card, Button, ListGroup } from "react-bootstrap";

export default function ({
  forms,
  onStart,
}: {
  forms: { id: number; title: string }[];
  onStart: (index: number) => void;
}) {
  return (
    <Card style={{ minHeight: "300px" }}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>Identificatie van AI-systemen en impactvolle algoritmes</Card.Title>

        <div className="mb-4">
          <p>
            Aan de hand van maximaal 7 vragen kun je al een gedegen inschatting maken of een datagedreven toepassing een AI-systeem of impactvol algoritme betreft. Vul de dynamische vragenlijst in.
          </p>
          <p>
            Dit open-source templates is afgestemd op eisen
            uit de AI-verordening en Nederlandse soft law kaders, zoals:
            <ul>
              <li>{" "}
                <a href="https://www.rijksoverheid.nl/documenten/rapporten/2023/07/11/onderzoekskader-algoritmes-adr-2023#:~:text=De%20Auditdienst%20Rijk%20heeft%20een,risico%27s%20beheerst%20%5C(kunnen%5C)%20worden." target="_blank"> Onderzoekskader Algoritmes</a> van de Audit Dienst Rijk (ADR)
              </li>
              <li>{" "}
                <a href="https://minbzk.github.io/Algoritmekader/" target="_blank">Algoritmekader</a> van het Ministerie van Binnenlandse Zaken en Koninkrijksrelaties
              </li>
              <li>{" "}
                <a href="https://www.rijksoverheid.nl/documenten/rapporten/2021/02/25/impact-assessment-mensenrechten-en-algoritmes" target="_blank">Impact Assessment Mensenrechten en Algoritmes</a> van het Binnenlandse Zaken en Koninkrijksrelaties.
              </li>
            </ul> 
          </p>
          <p>
            Help mee ontwikkelen, deel feedback middels{" "}
            <a href="https://github.com/NGO-Algorithm-Audit/AlgorithmAudit_website" target="_blank">
              Github
            </a>{" "}
            of via{" "}
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
                Start
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
