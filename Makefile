.PHONY: all

all: test-1 test-2 test-3 test-4 test-5 test-6 test-7

test-1:
	docker run --rm --name k6 -v `pwd`:/app -v `pwd`/result:/result grafana/k6 run --out csv=/result/result_1.csv -e STAGE=1 /app/script.js

test-2:
	docker run --rm --name k6 -v `pwd`:/app -v `pwd`/result:/result grafana/k6 run --out csv=/result/result_2.csv -e STAGE=2 /app/script.js

test-3:
	docker run --rm --name k6 -v `pwd`:/app -v `pwd`/result:/result grafana/k6 run --out csv=/result/result_3.csv -e STAGE=3 /app/script.js

test-4:
	docker run --rm --name k6 -v `pwd`:/app -v `pwd`/result:/result grafana/k6 run --out csv=/result/result_4.csv -e STAGE=4 /app/script.js

test-5:
	docker run --rm --name k6 -v `pwd`:/app -v `pwd`/result:/result grafana/k6 run --out csv=/result/result_5.csv -e STAGE=5 /app/script.js

test-6:
	docker run --rm --name k6 -v `pwd`:/app -v `pwd`/result:/result grafana/k6 run --out csv=/result/result_6.csv -e STAGE=6 /app/script.js

test-7:
	docker run --rm --name k6 -v `pwd`:/app -v `pwd`/result:/result grafana/k6 run --out csv=/result/result_7.csv -e STAGE=7 /app/script.js