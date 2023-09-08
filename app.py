from flask import Flask, jsonify, request,make_response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token,get_jwt_identity, set_access_cookies, unset_jwt_cookies
from flask_cors import CORS
import sqlite3
import bcrypt
from datetime import timedelta

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
app.config["JWT_EXPIRATION_DELTA"] = timedelta(hours=12)
jwt = JWTManager(app)
CORS(app, supports_credentials=True, origins=['http://localhost:1234'])

connection = sqlite3.connect("database.db")

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
@jwt_required()
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
def logout():
    # In this example, we don't refresh the token, effectively "logging out"
    resp = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(resp)
    return resp, 200

# Custom @app.after_request handler
@app.after_request
def refresh_expired_token(response):
    try:
        # Check if the current request had a valid JWT token
        identity = jwt.get_jwt_identity()

        if identity:
            # Calculate the remaining time until token expiration
            expires = jwt.get_expiration()
            now = jwt.get_iat()
            remaining_time = expires - now

            # Define a threshold for refreshing the token (e.g., refresh 5 minutes before expiration)
            refresh_threshold = timedelta(minutes=5)

            if remaining_time < refresh_threshold:
                # Generate a new token with an extended expiration time
                new_token = create_access_token(identity=identity, expires_delta=app.config["JWT_EXPIRATION_DELTA"])

                # Set the new token in the response headers
                response.headers["X-Refreshed-Token"] = new_token

    except Exception as e:
        # Handle any exceptions that may occur during token refresh (e.g., invalid token)
        print(f"Error refreshing token: {str(e)}")

    return response

if __name__ == '__main__':
    app.run(debug=True)


