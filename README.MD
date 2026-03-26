# Healthcare Charges Analytics & Prediction Platform

A full‑stack healthcare analytics dashboard built with **Flask**, **React (Vite)**, and **Recharts**, designed to explore patient demographics, visualize medical charge patterns, and generate cost predictions using a trained machine learning model.

## Live Demo

https://healthcare-analytics-dashboard-one.vercel.app/

## This project demonstrates end‑to‑end data engineering, model deployment, API design, and a frontend dashboard development.

## Project Overview

This platform provides:

### Interactive Analytics Dashboard

- Patient demographics (age, BMI, smoker status, sex distribution)
- Feature Impact visualization
- Average charges by region

![Patient Demographics screenshot](/healthcare-dashboard/assets/demographics.png)

![Feature Importance screenshot](/healthcare-dashboard/assets/feature_importance.png)

![Regional Costs screenshot](/healthcare-dashboard/assets/regional_costs.png)

### Machine Learning Predictions

Predicts medical insurance charges based on:

- Age
- Sex
- BMI
- Smoker status
- Number of children
- Region

![Patient Predicted Costs screenshot](/healthcare-dashboard/assets/predictor.png)

### Full‑Stack Architecture

- **Backend:** Flask API serving analytics + prediction endpoints
- **Frontend:** React + Vite dashboard with charts and forms
- **Model:** Trained regression model (e.g., Random Forest)
- **UI:** Sidebar navigation, chart headers, neutral color palette

---

## Project Structure

healthcare_analytics_dashboard/
│
├── backend/
│ ├── app.py
│ ├── model.pkl
│ ├── requirements.txt
│ │
│ ├── routes/
│ │ ├── predict.py
│ │ ├── risk.py
│ │ └── summary.py
│ │
│ ├── models/
│ │ └── risk_scoring.py
│ │
│ ├── utils/
│ │ ├── preprocess.py
│ │ └── load_model.py
│ │
│ └── data/
│ └── insurance.csv
│
├── healthcare-dashboard/ (frontend)
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ │
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ ├── index.css
│ │
│ │ ├── layouts/
│ │ │ └── SidebarLayout.jsx
│ │
│ │ ├── pages/
│ │ │ ├── Dashboard.jsx
│ │ │ └── PredictionForm.jsx
│ │
│ │ ├── components/
│ │ │ ├── ChartHeader.jsx
│ │ │ ├── PatientStats.jsx
│ │ │ ├── FeatureImportanceChart.jsx
│ │ │ └── RegionStatsChart.jsx
│ │
│ │ └── assets/
│ │
│ └── public/  
│
└── README.md

---

## How It Works

### Backend

- Loads a trained ML model
- Exposes REST API endpoints:
  - `/predict-cost`
  - `/api/patient-stats`
  - `/api/feature-importance`
  - `/api/region-stats`
- Performs preprocessing and returns JSON responses
- CORS enabled for frontend communication

### Frontend

- React + Vite SPA
- Sidebar layout with fixed navigation
- Dashboard with centered charts
- Prediction form with real‑time model inference
- Axios for API calls
- Recharts for data visualization

---

## Tech Stack

| Layer      | Technology                      |
| ---------- | ------------------------------- |
| Frontend   | React, Vite, Recharts, Axios    |
| Backend    | Flask, Flask‑CORS, Gunicorn     |
| ML Model   | Scikit‑Learn                    |
| Styling    | Custom CSS, inline styles       |
| Deployment | Render (API), Vercel (Frontend) |

---
