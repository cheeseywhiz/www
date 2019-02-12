.PHONY: all
all:
	tmux new -s app "cd nginx && make" \; \
		splitw "cd front && make" \; \
		splitw -h "cd api && make"

.PHONY: quit
quit:
	(cd nginx && make quit)
