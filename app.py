from flask import Flask, jsonify, request,make_response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token,get_jwt_identity, set_access_cookies, unset_jwt_cookies
from flask_cors import CORS
import sqlite3
import bcrypt

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)
CORS(app, supports_credentials=True, origins=['http://localhost:1234'])
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]

connection = sqlite3.connect("database.db")


registered_users = []

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM user WHERE username=?", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        conn.close()
        return jsonify({"message": "User already exists"}), 400

    # Hash and salt the password before storing it in the database
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    # Insert the new user into the database
    cursor.execute("INSERT INTO user (username, password) VALUES (?, ?)", (username, hashed_password))
    conn.commit()
    conn.close()

    return jsonify({'message': 'User registered successfully'}), 201

# Existing login and protected endpoints...

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    # Retrieve the user from the database
    cursor.execute("SELECT * FROM user WHERE username=?", (username,))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode("utf-8"), user[1].encode("utf-8")):
        access_token = create_access_token(identity=username)
        response = make_response(jsonify({'message': 'Login successful'}), 200)
        set_access_cookies(response, access_token)
        return response

    return jsonify({"message": "Invalid credentials"}), 400

@app.route('/protected', methods=['POST'])
@jwt_required(locations=["cookies"])
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/user', methods=['POST'])
@jwt_required(locations=["cookies"])
def user():
    current_user = get_jwt_identity()
    return jsonify(username=current_user), 200

# Logout route
@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    # In this example, we don't refresh the token, effectively "logging out"
    resp = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(resp)
    return resp, 200

if __name__ == '__main__':
    app.run(debug=True)


