import pandas as pd
import mysql.connector as mc


def main():
    l = []
    query = []
    excel = pd.read_excel(r"C:\Users\angel\Desktop\Book1.xlsx")
    excel.to_dict(orient='records')
    # excel = pd.DataFrame(excel)
    sql = "SELECT * FROM student;"
    conn = mc.connect(host="webapp.chd6y8koxcwf.ap-south-1.rds.amazonaws.com",
                      user="angelo",
                      password="angelogoves",
                      port=3306,
                      database="ANGELO", )
    cursor = conn.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    for each in excel:
        l.append(each)
    for j in range(0, len(l)):
        row = []
        for i in l:
            row.append(excel[i][j])
        date = str(row[5])
        date, k = date.split()
        k = 0
        for x in range(0,len(data)):
            if row[0] == data[x][0]:
                print(f"{row[0]} Already Exists.")
                k = 1
        if k == 0:
            query.append(f"""INSERT INTO student (rollno, firstname, lastname, department, academicyear, dob, email, phoneno) value ('{row[0]}','{row[1]}', '{row[2]}', '{row[3]}', '{row[4]}', '{date}', '{row[6]}', {row[7]});""")
            print(f"{row[0]} Added.")
    for each in query:
        cursor.execute(each)
        print(each)
    conn.commit()
    # print(cursor.rowcount, "record inserted.")


main()
