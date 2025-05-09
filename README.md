# 3D-Geometrie Visualizer – Frontend

Ein Angular-Frontend zur Eingabe, Berechnung und 3D-Visualisierung von geometrischen Figuren in Verbindung mit dem Spring Boot Backend (Modul 295).

---

## 🧠 Projektidee

Benutzer:innen können verschiedene 3D-Formen wie Kugeln, Quader, Kegel oder Pyramiden auswählen und deren mathematische Eigenschaften (Volumen, Oberfläche etc.) berechnen lassen. Die Ergebnisse werden zusätzlich in 3D visualisiert. Das Frontend kommuniziert über REST mit dem bestehenden Backend.

---

## ⚙️ Technologien

- Angular (v16+)
- Angular Material
- TypeScript / SCSS
- Three.js (für 3D-Visualisierung)
- angular-oauth2-oidc (für Login)
- GitHub
- Jasmine & Karma (Unit-Tests)

---

## 🔐 Rollen & Zugriff

- **USER**: Kann Figuren eingeben, berechnen und visualisieren
- **ADMIN**: Sieht zusätzlich alle gespeicherten Berechnungen & Diagramme im Dashboard

---

## 🧩 Hauptkomponenten

| Komponente               | Zweck                                                         |
|--------------------------|---------------------------------------------------------------|
| `LoginComponent`         | Login via Keycloak                                            |
| `ShapeInputComponent`    | Eingabe von Parametern je nach gewählter Figur                |
| `CalculationComponent`   | Darstellung von Volumen/Oberfläche etc.                       |
| `Shape3DViewComponent`   | Echtzeit-Visualisierung der Formen mit Three.js              |
| `ResultsComponent`       | Anzeige bisheriger Berechnungen                              |
| `AdminDashboardComponent`| Statistik & Verlauf (nur Admin)                              |
| `NavigationComponent`    | Menü, Routing, Rollenprüfung                                 |
| `NotFoundComponent`      | Fehlerseite für ungültige Pfade                              |

---

## 🔗 Backend-Anbindung (REST)

Das Frontend nutzt Angular Services für HTTP-Zugriffe mit OAuth2-Token.

| Endpoint          | Methode   | Beschreibung                             | Rolle         |
|-------------------|-----------|------------------------------------------|---------------|
| `/api/shapes`     | POST      | Figur speichern                          | USER / ADMIN  |
| `/api/calculate`  | POST      | Werte berechnen lassen                   | USER          |
| `/api/results`    | GET       | Liste aller Berechnungen                 | ADMIN         |

---

## 🚀 Projektziel

- Umsetzung der Anforderungen des Moduls 294
- 8+ Angular-Komponenten
- Keycloak Login + Rollenhandling
- 3D-Visualisierung (Three.js)
- Frontend-Tests
- Klare Trennung von USER/ADMIN-Oberflächen

---

## 📂 Projektstruktur (Frontend)
src/
├── app/
│ ├── components/
│ │ ├── login/
│ │ ├── shape-input/
│ │ ├── shape-3d-view/
│ │ ├── calculation/
│ │ ├── results/
│ │ └── admin-dashboard/
│ ├── services/
│ ├── guards/
│ ├── interceptors/
│ └── app-routing.module.ts
├── assets/
└── environments/


---

## 🧪 Unit-Tests

- Komponenten: z. B. `ShapeInputComponent`, `ResultsComponent`
- Services: HTTP-Kommunikation + Mock-Login
- Getestet mit Jasmine & Karma

---

## 🔧 Setup & Start

```bash
npm install
ng serve

---

🧑‍💻 Autor
Peter Ngo
Kurs: 23-294-F
Projektarbeit ÜK 294
