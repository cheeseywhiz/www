import functools
import json
import os
import click
import flask
import werkzeug.security
import util

__all__ = 'auth', 'init_app', 'auth_required'
auth = flask.Blueprint('auth', __name__, url_prefix='/api/auth')


def open_passwd_db(mode='r'):
    return open(
        os.path.join(flask.current_app.instance_path, 'passwd.json'),
        mode=mode,
    )


def get_passwd_db():
    if 'passwd_db' not in flask.g:
        with open_passwd_db() as file:
            flask.g.passwd_db = json.load(file)

    return flask.g.passwd_db


def write_passwd_db(passwords):
    with open_passwd_db('w') as file:
        json.dump(passwords, file)


@click.command('auth-init-passwd-db', help='Delete all entries in passwd db')
@flask.cli.with_appcontext
def init_passwd_db():
    write_passwd_db({})
    click.echo('Created passwd.json')


@click.command('auth-add-user', help='Add a user to the passwd db')
@click.argument('username')
@click.argument('password')
@flask.cli.with_appcontext
def add_user(username, password):
    passwords = get_passwd_db().copy()
    passwords[username] = werkzeug.security.generate_password_hash(password)
    write_passwd_db(passwords)
    get_passwd_db()
    click.echo(f'Added user {username}')


def init_app(app):
    app.cli.add_command(init_passwd_db)
    app.cli.add_command(add_user)


@auth.route('/login', methods=('POST', ))
def login():
    username = flask.request.form['username']
    password = flask.request.form['password']
    password_db = get_passwd_db()
    password_hash = password_db.get(username)

    if password_hash is None:
        return util.jsonify_status(403)(message='username not found')

    if not werkzeug.security.check_password_hash(password_hash, password):
        return util.jsonify_status(403)(message='incorrect password')

    flask.session.clear()
    flask.session['username'] = username
    return flask.jsonify(message=f'successfully logged in to user {username}')


@auth.before_app_request
def load_logged_in_user():
    flask.g.username = flask.session.get('username')


@auth.route('/logout', methods=('POST', ))
def logout():
    flask.session.clear()
    return flask.jsonify(message='successfully logged out')


def auth_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if flask.g.username is None:
            login_url = flask.url_for('auth.login')
            return util.jsonify_status(403)(
                message=f'login required at {login_url}',
            )

        return view(**kwargs)

    return wrapped_view
