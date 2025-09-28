CREATE DATABASE vitalsdb IF NOT EXISTS;

\c vitalsdb;

CREATE TABLE patients IF NOT EXISTS (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vitals IF NOT EXISTS (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    heart_rate INT NOT NULL,
    bp VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add sample data

INSERT INTO patients (name, age) VALUES ('John Doe', 24);

INSERT INTO vitals (patient_id, heart_rate, bp) VALUES (1, 80, '120/80');

-- Print all data

SELECT * FROM patients;
SELECT * FROM vitals;
