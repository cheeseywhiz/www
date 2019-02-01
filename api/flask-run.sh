#!/bin/bash
# Start development server in its own environment

flask-run() {
	source ~/www/api/venv/bin/activate
	export FLASK_APP=$HOME/www/api/app.py
	export FLASK_ENV=development
	tmux new -d -s app flask run
}

(flask-run)
exec tmux a -t app
