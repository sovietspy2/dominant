from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token,get_jwt_identity

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

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
    return jsonify({'access_token': access_token}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)