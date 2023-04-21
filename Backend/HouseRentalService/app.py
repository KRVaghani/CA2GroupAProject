from flask import Flask, session, request, jsonify, g, abort
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
import jwt
from functools import wraps
import os
from flask_mail import Mail,Message
from flask_session import Session
import jwt
import secrets



mysql = MySQL()
app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

CORS(app,supports_credentials=True)


app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

@app.route('/api', methods=['POST'])
def api():
    data = request.json
    response_data = {'message': 'Received data: {}'.format(data)}
    return jsonify(response_data)

# MySQL configuration
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'kv1897'
#app.config['MYSQL_PASSWORD'] = 'Admin@123'
app.config['MYSQL_DB'] = 'housepro'
app.config['MYSQL_HOST'] = 'localhost' 
app.config["MYSQL_CURSORCLASS"] = "DictCursor"
mysql.init_app(app)


# mail configuration

app.config['MAIL_SERVER'] = 'smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'sampledbsproject@outlook.com'
app.config['MAIL_PASSWORD'] = 'Dublin@14'
mail = Mail(app)

mail = Mail(app)

"""
Generate a random string of characters
secret_key = os.urandom(32)

Secret key for JWT

secrets.token_hex(32)
"""

app.config['SECRET_KEY'] = "8c4f4f381f7ccf0b7e7ca765be6a99fc088073e7e329834ff34fad4dc37bcf04"

def authenticate(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'Authorization' not in request.headers:
            abort(401)
        token = request.headers.get('Authorization')
        try:
            # Verify JWT token

            decoded = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms=['HS256'])
            print(decoded)
            g.current_user = decoded['owner_id']
        except Exception as e:
            print("Exception :>>>", str(e))
            abort(401)
        return f(*args, **kwargs)
    return wrapper


@app.route("/login", endpoint='login', methods=['POST'])
def login():

    data = request.get_json()
    print(data)
    cemail = data['email']
    cpass = data['password']

    # Query MySQL database for house owner with the given email and password
    cursor = mysql.connection.cursor()

    print(cursor)
    cursor.execute(
        "SELECT * FROM house_owners WHERE email=%s AND password=%s", (cemail, cpass))
    result = cursor.fetchone()
    cursor.close()

    if result is None:
        abort(401)
    else:
        print(result)
        owner_id = result.get("id")
        session['owner_id'] = owner_id
        token = jwt.encode({'sub': owner_id, "owner_id": owner_id}, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({'token': token}), 200


@app.route("/property", endpoint='property', methods=['POST'])
@authenticate
def add_property():

    data = request.get_json()
    print(data)

    # Extract the data from the request
    owner_id = g.current_user
    address = data['address']
    bedrooms = data['bedrooms']
    description = data['description']
    price = data['price']
    url = data['image_url']
    property_type = data['type']
    city = data['city']

    # Query MySQL database to insert the new property
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO properties (owner_id, address, bedrooms, description, price, url, type, city) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",(owner_id, address, bedrooms, description, price, url, property_type, city))
    mysql.connection.commit()
    cursor.close()

    # Return a success message
    return jsonify({"add_property": "success"}), 200


@app.route('/properties',endpoint='properties', methods=['GET'])
def get_properties():
    
    # Retrieve all property listings.

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM properties")
    results = cursor.fetchall()
    cursor.close()

    return jsonify({"properties": results}), 200

@app.route("/existing-property-endpoint/<int:property_id>", endpoint='existing_property', methods=['GET'])
def get_existing_property(property_id):
    # your code here

    # Query MySQL database for the property with the given ID
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM properties WHERE id=%s", (property_id,))
    result = cursor.fetchone()
    cursor.close()

    # If the property does not exist, return an error message
    if result is None:
        return jsonify({"error": "Property does not exist"}), 404

    # Otherwise, return the property as a JSON response
    return jsonify(result), 200


@app.route("/register", endpoint='register', methods=['POST'])
def register():

    data = request.get_json()
    print(data)

    # Extract the data from the request
    name = data['name']
    email = data['email']
    password = data['password']
    phone = data['phone']


    # Query MySQL database to check if the email already exists
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM house_owners WHERE email=%s", (email,))
    result = cursor.fetchone()

    # If the email already exists, return an error message
    if result is not None:
        cursor.close()
        return jsonify({"error": "Email already exists"}), 400

    # Otherwise, insert the new house owner data into the database
    cursor.execute("INSERT INTO house_owners (name, email, password, phone) VALUES (%s, %s, %s, %s)",
                   (name, email, password, phone))
    mysql.connection.commit()
    cursor.close()

    # Return a success message
    return jsonify({"registration": "success"}), 200


@app.route("/change_password", endpoint='change_password', methods=['POST'])
def change_password():


    data = request.get_json()
    

    # Extract the data from the request
    email = data['email']
    current_password = data['current_password']
    new_password = data['new_password']
    confirm_password = data['confirm_password']

    # Query MySQL database to check if the house owner with the given email and password exists
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM house_owners WHERE email=%s AND password=%s", (email, current_password))
    result = cursor.fetchone()

    # If the house owner does not exist, return an error message
    if result is None:
        cursor.close()
        return jsonify({"error": "Invalid email or password"}), 401

    # If the new password and confirm password do not match, return an error message
    if new_password != confirm_password:
        cursor.close()
        return jsonify({"error": "New password and confirm password do not match"}), 400

    # Otherwise, update the house owner's password in the database
    cursor.execute("UPDATE house_owners SET password=%s WHERE email=%s", (new_password, email))
    mysql.connection.commit()
    cursor.close()

    # Return a success message
    return jsonify({"change_password": "success"}), 200

@app.route("/update_property", endpoint='update_property', methods=['PUT', 'OPTIONS'])
@authenticate
def update_property():

    data = request.get_json()
    print(data)

    # Extract the data from the request
    property_id = data['property_id']
    owner_id = g.current_user
    address = data['address']
    bedrooms = data['bedrooms']
    description = data['description']
    min_rent = data['min_rent']
    max_rent = data['max_rent']
    url = data['url']
    property_type = data['property_type']

    # Query MySQL database to check if the property exists
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM properties WHERE id=%s", (property_id,))
    result = cursor.fetchone()

    # If the property does not exist, return an error message
    if result is None:
        cursor.close()
        return jsonify({"error": "Property does not exist"}), 404

    # Otherwise, update the property in the database
    cursor.execute("UPDATE properties SET owner_id=%s, address=%s, bedrooms=%s, description=%s, min_rent=%s, max_rent=%s, url=%s, type=%s WHERE id=%s", (owner_id, address, bedrooms, description, min_rent, max_rent, url, property_type, property_id))
    mysql.connection.commit()
    cursor.close()

    # Return a success message
    return jsonify({"update_property": "success"}), 200

@app.route("/delete_property", endpoint='delete_property', methods=['DELETE'])
def delete_property():

    data = request.get_json()
    print(data)

    # Extract the data from the request
    property_id = data['property_id']

    # Query MySQL database to check if the property exists
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM properties WHERE id=%s", (property_id,))
    result = cursor.fetchone()

    # If the property does not exist, return an error message
    if result is None:
        cursor.close()
        return jsonify({"error": "Property does not exist"}), 404

    # Otherwise, delete the property from the database
    cursor.execute("DELETE FROM properties WHERE id=%s", (property_id,))
    mysql.connection.commit()
    cursor.close()

    # Return a success message
    return jsonify({"delete_property": "success"}), 200

@app.route("/my_properties", endpoint='my_properties', methods=['GET'])
@authenticate
def view_my_properties():

    # Get the authenticated house owner's ID from the session
    owner_id = g.current_user
    print("Logged in user:>>",g.current_user)

    # If the house owner is not logged in, return an error message
    # if owner_id is None:
    #     return jsonify({"error": "Not logged in"}), 401

    # Query MySQL database for the house owner's properties
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM properties WHERE owner_id=%s", (owner_id,))
    result = cursor.fetchall()
    cursor.close()

    # Return the properties as a JSON response
    return jsonify({"properties": result}), 200

@app.route("/search_properties", endpoint='search_properties', methods=['GET'])
def search_properties():

    # Get the search query parameters
    search_query = request.args.get('q')

    # Query MySQL database for properties that match the search query
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM properties WHERE address LIKE %s OR description LIKE %s", ('%' + search_query + '%', '%' + search_query + '%'))
    result = cursor.fetchall()
    cursor.close()

    # Return the matching properties as a JSON response
    return jsonify({"properties": result}), 200

@app.route("/filter_properties", endpoint='filter_properties', methods=['GET'])
def filter_properties():

    # Get the filter query parameters
    property_type = request.args.get('type')
    city = request.args.get('city')

    # Build the SQL query based on the filter parameters
    sql_query = "SELECT * FROM properties"
    query_params = []
    if property_type is not None or city is not None:
        sql_query += " WHERE"
        if property_type is not None:
            sql_query += " type=%s"
            query_params.append(property_type)
        if city is not None:
            if len(query_params) > 0:
                sql_query += " AND"
            sql_query += " city=%s"
            query_params.append(city)

    # Query MySQL database for properties that match the filter criteria
    cursor = mysql.connection.cursor()
    cursor.execute(sql_query, tuple(query_params))
    result = cursor.fetchall()
    cursor.close()

    # Return the matching properties as a JSON response
    return jsonify({"properties": result}), 200

@app.route("/submit_property_request", endpoint='submit_property_request', methods=['POST'])
def submit_property_request():

    data = request.get_json()
    property_id = data['property_id']
    name = data['name']
    email = data['email']
    phone = data['phone']
    description_message = data['description_message']

    # Query the MySQL database to get the owner's email address
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT o.email FROM properties p JOIN house_owners o ON p.owner_id=o.id WHERE p.id=%s", (property_id,))
    result = cursor.fetchone()
    cursor.close()

    if result is None:
        abort(404)

    owner_email = result.get('email')
    print(owner_email)
    # Send an email notification to the property owner
    # You can use a library like Flask-Mail to send emails
    # Here is an example using Flask-Mail
    msg = Message(subject="New Property Request",
                  sender="sampledbsproject@outlook.com",
                  recipients=[owner_email])
    msg.body = f"You have a new property request for property ID {property_id}. \n\nName: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{description_message}"
    mail.send(msg)

    # Insert the property request into the MySQL database
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO property_request (property_id, name, email, phone, description_message) VALUES (%s, %s, %s, %s, %s)",
                   (property_id, name, email, phone, description_message))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Property request submitted successfully."}), 200

if __name__ == '__main__':
    app.run(debug=True)
