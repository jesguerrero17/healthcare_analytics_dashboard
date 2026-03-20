CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    age INT,
    sex TEXT,
    bmi FLOAT,
    children INT,
    smoker BOOLEAN,
    region TEXT,
    charges FLOAT
);

CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    age INT,
    sex TEXT,
    bmi FLOAT,
    children INT,
    smoker BOOLEAN,
    region TEXT,
    predicted_charges FLOAT,
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE risk_assessments (
    id SERIAL PRIMARY KEY,
    age INT,
    bmi FLOAT,
    smoker BOOLEAN,
    risk_score FLOAT,
    risk_level TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);

