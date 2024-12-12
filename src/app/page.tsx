"use client";

import PlantUmlViewer from "@/components/PlantUmlViewer";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "plantumlCode";

export default function Home() {
  // Zustand für den UML-Code
  const [umlCode, setUmlCode] = useState<string>("");

  // Beim Laden der Seite: UML-Code aus dem localStorage wiederherstellen
  useEffect(() => {
    const savedUmlCode = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedUmlCode) {
      setUmlCode(savedUmlCode);
    } else {
      // Falls nichts gespeichert ist, einen Standardwert setzen
      setUmlCode(`
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
    }
  }, []);

  // Beim Ändern des UML-Codes: Speichere in localStorage
  const handleUmlCodeChange = (newCode: string) => {
    setUmlCode(newCode);
    localStorage.setItem(LOCAL_STORAGE_KEY, newCode);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>PlantUML Viewer</h1>
      <div className="grid grid-cols-2 gap-4">
        <textarea
          value={umlCode}
          onChange={(e) => handleUmlCodeChange(e.target.value)}
          className="text-sm w-full h-full text-black p-4"
        />
        <PlantUmlViewer umlCode={umlCode} />
      </div>
    </div>
  );
}
