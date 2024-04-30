from flask import Flask, jsonify, request
from db import User, Apps, Comments
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime as datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///apps.db'
DB = SQLAlchemy(app)
CORS(app)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    return response

@app.route('/users', methods=['GET'])
def get_users():
    users = DB.session.query(User).all()
    user_list = []
    for user in users:
        user_dict = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
        }
        user_list.append(user_dict)
    return jsonify(user_list)

@app.route('/users/<int:user_id>', methods=['GET', 'DELETE', 'POST'])
def get_del_upd_user(user_id):
    user = DB.session.query(User).filter_by(id=user_id).first()
    if not user:
        return jsonify({'message': 'Пользователь не найден'}), 404
    if request.method == 'GET':
        user_list = []
        user_dict = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
        }
        user_list.append(user_dict)
        return jsonify(user_list)
    elif request.method == 'DELETE':
        DB.session.delete(user)
        DB.session.commit()
        return jsonify({'message': 'Пользователь удален'})
    elif request.method == 'POST':
        user = DB.session.query(User).filter_by(id=user_id).first()
        data = request.get_json()
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'password' in data:
            user.password = data['password']
        DB.session.commit()
        return jsonify({'message': user.email})

@app.route('/reg', methods=['POST'])
def reg_user():
    data = request.get_json()
    new_user = User(name=data['name'], email=data['email'], password=data['password'])
    DB.session.add(new_user)
    DB.session.commit()
    return jsonify({'id': new_user.id})

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = DB.session.query(User).filter_by(email=data['email'], password=data['password']).first()
    if user:
        return jsonify({'id': user.id, 'email': user.email, 'password': user.password})
    else:
        return jsonify({'message': 0})

@app.route('/comments', methods=['GET'])
def get_comments():
    comments = DB.session.query(Comments).all()
    comment_list = []
    for comment in comments:
        comment_dict = {
            'id': comment.id,
            'appId': comment.appId,
            'userId': comment.userId,
            'text': comment.text,
            'date': comment.date,
        }
        comment_list.append(comment_dict)
    return jsonify(comment_list)

format = "%H:%M"
@app.route('/comments', methods=['POST'])
def create_comment():
    now = datetime.datetime.now()
    data = request.get_json()
    new_comment = Comments(userId=data['userId'], appId=data['appId'], text=data['text'], date=now.strftime(format))
    DB.session.add(new_comment)
    DB.session.commit()
    return jsonify({'message': 'comment has success done'})

@app.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = DB.session.query(Comments).filter_by(id=comment_id).first()
    data = request.get_json()
    comment.text = data['text']
    DB.session.commit()
    return jsonify({'message': 'success'})

@app.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = DB.session.query(Comments).filter_by(id=comment_id).first()
    DB.session.delete(comment)
    DB.session.commit()
    return jsonify({'message': 'Comment deleted successfully'})

@app.route('/apps', methods=['GET'])
def get_apps():
    apps = DB.session.query(Apps).all()
    app_list = []
    for app in apps:
        app_dict = {
            'id': app.id,
            'name': app.name,
            'description': app.description,
            'image': app.image,
            'predmet': app.predmet,
        }
        app_list.append(app_dict)

    return jsonify(app_list)

@app.route('/app/<int:app_id>', methods=['GET'])
def get_app(app_id):
    apps = DB.session.query(Apps).filter_by(id=app_id)
    if not apps:
        return jsonify({'message': 0})
        
    else: 
        app_list = []
        for app in apps:
            app_dict = {
                'id': app.id,
                'name': app.name,
                'description': app.description,
                'image': app.image,
                'predmet': app.predmet,
            }
            app_list.append(app_dict)

        return jsonify(app_list)



@app.route('/apps', methods=['POST'])
def create_apps():
    data = request.json
    new_app = Apps(name=data['name'], predmet=data['predmet'], description=data['description'], image=data['image'])
    DB.session.add(new_app)
    DB.session.commit()
    app_data = {
        'name': new_app.name,
        'predmet': new_app.predmet,
        'description': new_app.description,
        'image': new_app.image
    }
    return jsonify(app_data)

@app.route('/apps/<int:app_id>', methods=['PUT'])
def update_apps(app_id):
    app = DB.session.query(Apps).get(app_id)
    data = request.json
    for key, value in data.items():
        setattr(app, key, value)
    DB.session.commit()
    return jsonify({'msg': 1})

@app.route('/apps/<int:app_id>', methods=['DELETE'])
def delete_apps(app_id):
    app = DB.session.query(Apps).get(app_id)
    DB.session.delete(app)
    DB.session.commit()
    return jsonify({'message': 'App deleted successfully'})

if __name__ == '__main__':
    with app.app_context():
        DB.create_all()
        DB.session.close()
        app.run(debug=True)