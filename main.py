from flask import Flask
from flask import send_file
from flask import request
from flask import json
import os
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
db = SQLAlchemy(app)

# Database Models
class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, unique=True, primary_key=True)
    title = db.Column(db.String(128), unique=False)
    description = db.Column(db.String(256), unique=False)
    upvotes = db.Column(db.Integer)
    downvotes = db.Column(db.Integer)
    tag = db.Column(db.String(64))

    def __repr__(self):
        return '<Post %r>' % self.title

@app.route('/', methods=['GET', 'POST'])
def init():
    return send_file("templates/index.html")


@app.route('/createproposal')
def createProposal():
    return send_file("templates/createproposal.html")

@app.route('/proposal')
def proposal():
    return send_file("templates/proposal.html")


@app.route('/search', methods=['GET', 'POST'])
def parseSearch():
    data = json.loads(request.data.decode())
    if data["search"]:
        search = data["search"]
    else:
        search = "*"
    list = db.session.query(Post)
    jsonlist = {'result':[]}
    for post in list:
        searchText = str(post.title + " " + post.description + " " + post.tag).lower()

        item = {}
        item['title'] = post.title
        item['description'] = post.description
        item['upvote'] = post.upvotes
        item['downvote'] = post.downvotes
        item['tags'] = post.tag

        if search in searchText:
            jsonlist['result'].append(item)
        elif search is "*":
            jsonlist['result'].append(item)

    print(jsonlist)
    response = app.response_class(
        response=json.dumps(jsonlist),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/submitProposal', methods=['GET', 'POST'])
def submitProposal():
    data = json.loads(request.data.decode())
    newData = Post(title=data["title"], description=data["details"], upvotes=0, downvotes=124, tag=data["tags"]);
    db.session.add(newData)
    db.session.commit()
    return "success"

if __name__ == '__main__':
    app.run()
