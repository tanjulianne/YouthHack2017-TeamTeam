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


@app.route('/search', methods=['GET', 'POST'])
def parseSearch():
    data = json.loads(request.data.decode())
    search = data["search"]
    print("Searching for: " + search)
    return search


@app.route('/submitProposal', methods=['GET', 'POST'])
def submitProposal():
    data = json.loads(request.data.decode())
    proposalTitle = data["title"]
    proposalDetails = data["details"]
    proposalTags = data["tags"]
    print(proposalTitle)
    print(proposalDetails)
    print(proposalTags)
    return "success"

if __name__ == '__main__':
    app.run()
