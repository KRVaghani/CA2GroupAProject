from flask import Flask, request, jsonify, g, abort
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
import jwt
from functools import wraps
import os


mysql = MySQL()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/api', methods=['POST'])
def api():
    data = request.json
    response_data = {'message': 'Received data: {}'.format(data)}
    return jsonify(response_data)

# MySQL configuration
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'kv1897'
app.config['MYSQL_DB'] = 'housepro'
app.config['MYSQL_HOST'] = 'localhost' 
mysql.init_app(app)

# Generate a random string of characters
secret_key = os.urandom(32)

# Secret key for JWT
app.config['SECRET_KEY'] = "eyJhbGciOiJIUzI1NiJ9.ew0KICAic3ViIjogIjEyMzQ1Njc4OTAiLA0KICAibmFtZSI6ICJBbmlzaCBOYXRoIiwNCiAgImlhdCI6IDE1MTYyMzkwMjINCn0.X3ZBXE9ycu4xJ4pPHc9QMP8gsOIe0Dez00F-m6Y6NAU"

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
            g.current_user = decoded['user_id']
        except:
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
        return jsonify({"login": "success"}), 200


@app.route('/properties', methods=['POST'])
@authenticate
def create_property():

    # Create a new property listing.
    data = request.get_json()

    # Insert property listing into MySQL database with current user ID
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO properties (owner_id, address, bedrooms, bathrooms, price) VALUES (%s, %s, %s, %s, %s)",
                   (g.current_user, data['address'], data['bedrooms'], data['bathrooms'], data['price']))
    mysql.commit()
    cursor.close()

    return jsonify({'success': True}), 201


@app.route('/properties', methods=['GET'])
def get_properties():
    
    # Retrieve all property listings.

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM properties")
    results = cursor.fetchall()
    cursor.close()

    return jsonify(results), 200


@app.route("/update_property", endpoint='update_property', methods=['PUT'])
def update_property():

    data = request.get_json()
    print(data)

    # Extract the data from the request
    property_id = data['property_id']
    owner_id = data['owner_id']
    address = data['address']
    bedrooms = data['bedrooms']
    description = data['description']
    price = data['price']
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
    cursor.execute("UPDATE properties SET owner_id=%s, address=%s, bedrooms=%s, description=%s, price=%s, url=%s, type=%s WHERE id=%s", (owner_id, address, bedrooms, description, price, url, property_type, property_id))
    mysql.connection.commit()
    cursor.close()

    # Return a success message
    return jsonify({"update_property": "success"}), 200

if __name__ == '__main__':
    app.run(debug=True)
