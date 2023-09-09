from flask import Flask, jsonify, request,make_response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token,get_jwt_identity, set_access_cookies
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)
CORS(app, supports_credentials=True)


socketio = SocketIO(app)



##### WEBSOCKETS

@socketio.on('json')
def handle_json(json):
    print('received json: ' + str(json))


@socketio.on('my event')
def handle_my_custom_event(json):
    emit('my response', json)

@socketio.on('my event')
def handle_my_custom_event(data):
    emit('my response', data, broadcast=True)


@socketio.on('connect')
def test_connect(auth):
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app, debug=True)


