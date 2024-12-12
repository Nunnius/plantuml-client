import React from "react";
import plantumlEncoder from "plantuml-encoder";

interface PlantUmlViewerProps {
  umlCode: string;
}

const PlantUmlViewer: React.FC<PlantUmlViewerProps> = ({ umlCode }) => {
  // Lade die Server-URL aus der Umgebungsvariable
  const plantUmlServerUrl = process.env.NEXT_PUBLIC_PLANTUML_SERVER;

  if (!plantUmlServerUrl) {
    return (
      <p style={{ color: "red" }}>
        Fehler: PlantUML-Server-URL nicht definiert!
      </p>
    );
  }

  // Encode UML-Code in URL
  const encodedUml = plantumlEncoder.encode(umlCode);

  // Vollständige URL generieren
  const umlImageUrl = `${plantUmlServerUrl}${encodedUml}`;

  return (
    <div>
      <h2>PlantUML Diagram</h2>
      <img src={umlImageUrl} alt="PlantUML Diagram" />
    </div>
  );
};

export default PlantUmlViewer;
