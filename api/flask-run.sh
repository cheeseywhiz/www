#!/bin/bash
# Start development server in its own environment

die() {
	echo $@
	exit 1
}

flask-run() {
	source ~/www/api/venv/bin/activate
	export FLASK_APP=$HOME/www/api/app.py
	export FLASK_ENV=development
	tmux new -d -s app flask run
}

tmux ls >& /dev/null && die Close other tmux sessions first
(flask-run)
exec tmux a -t app
