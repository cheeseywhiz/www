import flask
import time
import subprocess

app = flask.Flask(__name__)


@app.route('/api/time')
def index():
    return flask.make_response(
        str(int(time.time())),
        {'Cache-Control': 'no-cache'},
    )


@app.route('/api/id')
def id():
    return subprocess.run('id', capture_output=True).stdout.decode()
