# 🛰️ Santellite : VitaOrbit
### Plateforme Autonome de Surveillance Clinique & Télémétrie Médicale Spatiale
**NASA Space Apps Challenge 2026** • Libreville, Gabon • Équipe 404 Introuvable

---

## 🌌 À Propos du Projet
**Santellite : VitaOrbit** est un logiciel de surveillance clinique en temps réel conçu pour les équipages d'astronautes en mission longue durée (Station Spatiale Internationale, transit cis-lunaire Artemis, exploration martienne). 

Face aux délais de communication radio avec la Terre (pouvant atteindre 22 minutes sur Mars) et à l'impossibilité de rapatrier d'urgence un astronaute, Santellite analyse en continu les biométriques, évalue les 5 risques majeurs de la NASA (*Human Spaceflight Hazards*) et formule des protocoles médicaux immédiats.

---

## ⚡ Fonctionnalités Clés

### 1. Intégration de 6 Dispositifs Médicaux Spatiaux Réels
- **Maillot Biométrique Carré Technologies Astroskin** (Agence Spatiale Canadienne / ISS) : ECG 3 dérivations (250 Hz), respiration inductive bipolaire, pression artérielle optique en continu (PTT) sans brassard gonflable.
- **Montre Médicale Empatica EmbracePlus** (NASA / TRISH) : Conductance cutanée (EDA / stress aigu), photopléthysmographie (PPG), variabilité cardiaque (VFC), température périphérique infrarouge.
- **Échographe Osseux Portatif EchoLight REMS** (NASA Human Research Program) : Suivi sans radiation de l'ostéopénie et de la microarchitecture trabéculaire en microgravité (scan fémoral & rachis en < 10 min).
- **Dosimètre Personnel de Radiations Tracerco PED2-IS+** (NASA HRP) : Débit de dose en continu (µSv/h) et dose cumulée (mSv), seuils d'alerte lors d'Événements à Particules Solaires (SPE).
- **Biocapteur Salivaire ASI / Université de Bologne** : Dosage rapide non invasif du cortisol (stress chronique) et de la DHEA-S (équilibre immunitaire) par cartouche microfluidique USB.
- **Actigraphie Spatiale ARCHeR (Actiwatch Spectrum Plus & ActLumus)** (NASA Ames / Artemis II) : Actimétrie haute précision (32 Hz), photodétecteurs ambiants (spectre bleu/rouge/vert) et analyse du rythme circadien.

### 2. Cockpit Médical & Tableau de Bord Avancé (`dashboard.html`)
- **Silhouette Humaine Interactive 3D** : Cartographie vectorielle SVG cliquable avec retours en langage clair pour les organes clés (Cœur, Poumons, Os, Cerveau, Système immunitaire, Estomac).
- **Sélecteur d'Environnement de Mission** : Adaptation dynamique des priorités de risques selon 4 environnements (*Vaisseau en transit*, *Station orbitale*, *Rover de surface*, *Base planétaire*).
- **Indicateurs Fondamentaux & Sparklines 24h** : Pression artérielle, rythme cardiaque, glycémie, température, sommeil et humeur avec mini-graphiques de tendance et indices de confiance capteur.
- **Nutrition & Hydratation Déclarative** : Module interactif de suivi calorique (cible 2800 kcal) et hydrique (cible 2.5 L) avec rations spatiales pré-remplies.
- **Routine Quotidienne de Santé (Gamification Sobre)** : Suivi des contre-mesures obligatoires (exercice 2h, tension, sommeil), calcul de streak et badges de constance persistants via `localStorage`.
- **Scanner Optique par Caméra (OCR Assisté)** : Capture d'affichages d'appareils médicaux de secours via webcam/caméra avec validation humaine obligatoire avant enregistrement.

---

## 🛠️ Stack Technique
- **Double Moteur** :
  - **Version Standalone (Ultra-légère)** : `index.html`, `dashboard.html`, `script.js`, `dashboard.js`, Tailwind CSS, Lucide Icons, Canvas API (ECG 250 Hz).
  - **Version Modulaire Next.js** : Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React.
- **Sécurité & Données** : Chiffrement simulé AES-256, validation clinique assistée par Bio-IA, respect strict de la confidentialité médicale.

---

## 🚀 Lancement Local

### Option A : Version Standalone (Sans installation)
Ouvrez simplement `index.html` ou `dashboard.html` dans n'importe quel navigateur web moderne.

### Option B : Application Next.js
```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev
```
Accédez ensuite à [http://localhost:3000](http://localhost:3000).

---

## 👥 Équipe 404 Introuvable
Projet développé dans le cadre du **NASA Space Apps Challenge 2026** (Édition de Libreville, Gabon).
