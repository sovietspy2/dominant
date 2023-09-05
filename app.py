from flask import Flask, jsonify, request,make_response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token,get_jwt_identity, set_access_cookies
from flask_cors import CORS

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)
CORS(app, supports_credentials=True, origins=['http://localhost:1234'])
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]


registered_users = []

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the username already exists
    if any(user['username'] == username for user in registered_users):
        return jsonify({'message': 'Username already exists'}), 400

    # Add the user to the list (in a real app, you'd store it in a database)
    registered_users.append({'username': username, 'password': password})

    return jsonify({'message': 'User registered successfully'}), 201

# Existing login and protected endpoints...

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # In a real application, you would validate the credentials here.
    # For simplicity, we'll assume a username and password match.

    # Create and return an access token
    access_token = create_access_token(identity=username)
    response = make_response(jsonify({'message': 'Login successful'}), 200)
    set_access_cookies(response, access_token)
    
    return response

@app.route('/protected', methods=['POST'])
@jwt_required(locations=["cookies"])
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)


