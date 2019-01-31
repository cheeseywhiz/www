import flask
import time

app = flask.Flask(__name__)


@app.route('/api/')
def index():
    return flask.make_response(
        str(int(time.time())),
        {'Cache-Control': 'no-cache'},
    )
