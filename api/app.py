import flask
import time
import os
import pwd
import grp

app = flask.Flask(__name__)


@app.route('/api/time')
def index():
    return flask.make_response(
        str(int(time.time())),
        {'Cache-Control': 'no-cache'},
    )


@app.route('/api/id')
def id():
    user_data = pwd.getpwuid(os.getuid())
    group_data = grp.getgrgid(os.getgid())
    groups_data = [
        grp.getgrgid(gid)
        for gid in os.getgroups()
    ]
    return flask.jsonify(
        user=(user_data.pw_uid, user_data.pw_name),
        group=(group_data.gr_gid, group_data.gr_name),
        groups=[
            (group.gr_gid, group.gr_name)
            for group in groups_data
        ],
    )
