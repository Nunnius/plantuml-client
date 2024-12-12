"use client";

import PlantUmlViewer from "@/components/PlantUmlViewer";
import { useState } from "react";

export default function Home() {
  const [umlCode, setUmlCode] = useState<string>(`
@startuml
actor Benutzer
participant UI
participant LocalStorage
participant Vergleichslogik

Benutzer -> UI : Klick auf Vergleichs-Button
UI -> LocalStorage : Artikel vorhanden?
LocalStorage --> UI : Ja/Nein

alt Artikel vorhanden
    UI -> Benutzer : "Artikel ist bereits im Vergleich"
else Artikel nicht vorhanden
    UI -> LocalStorage : Artikel hinzufügen
end

UI -> Vergleichslogik : Vergleiche Artikel
Vergleichslogik --> UI : Merkmale zurückgeben
UI -> Benutzer : Vergleichsergebnisse anzeigen
@enduml
  `);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>PlantUML Viewer</h1>
      <div className="grid grid-cols-2 gap-4">
        <textarea
          value={umlCode}
          onChange={(e) => setUmlCode(e.target.value)}
          rows={10}
          cols={50}
          className="text-sm w-full h-full text-black"
        />
        <PlantUmlViewer umlCode={umlCode} />
      </div>
    </div>
  );
}
