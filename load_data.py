import pandas as pd
import psycopg2

df = pd.read_csv("data/cleaned.csv")

conn = psycopg2.connect(
    host="localhost",
    database="healthcare",
    user="postgres",
    password="grandeANTE18!"
)

cur = conn.cursor()

for _, row in df.iterrows():
    cur.execute("""
        INSERT INTO patients (age, sex, bmi, children, smoker, region, charges)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        row['age'], row['sex'], row['bmi'], row['children'],
        bool(row['smoker']), row['region'], row['charges']
    ))

conn.commit()
cur.close()
conn.close()