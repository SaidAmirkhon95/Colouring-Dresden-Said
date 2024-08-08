import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  password="yourpassword"
)

print(mydb) 

user_id = 'some_user_id'  # Replace with actual user ID

sust_average_consumption_m2 = """
    SELECT
        geometry_id,
        ((electricity_usage + gas_usage) / number_persons) AS sust_average_consumption_m2
    FROM
        buildings
    WHERE
        electricity_usage IS NOT NULL 
        AND gas_usage IS NOT NULL 
        AND number_persons IS NOT NULL;
"""

sust_buil_id_personal = """
    SELECT
        building_id
    FROM 
        logs
    WHERE
        user_id = :user_id;
"""
#To only show the buildings you have edited
sust_average_consumption_m2_personal = """ 
    SELECT 
        geometry_id,
        ((electricity_usage + gas_usage) / number_persons) AS sust_average_consumption_m2
    FROM
        buildings
    WHERE
        electricity_usage IS NOT NULL 
        AND gas_usage IS NOT NULL 
        AND number_persons IS NOT NULL
        AND building_id IN (
            SELECT 
                building_id
            FROM 
                logs
            WHERE
                user_id = :user_id
        );
"""

# Replace :user_id with actual user_id in the queries
sust_buil_id_personal = sust_buil_id_personal.replace(':user_id', user_id)
sust_geom_id_personal = sust_geom_id_personal.replace(':user_id', user_id)

# Execute the queries using your database connection..