import http from 'k6/http';
import { check } from 'k6';
import { server, stage } from './config.js';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const order = (location, timestamp) => {
    const res = http.post(`http://${server.host}:${server.port}/api/order`,
    JSON.stringify(
        {
            "location": location,
            "timestamp": timestamp,
            "data": {
                "a": getRandomIntInclusive(10, 25),
                "b": getRandomIntInclusive(10, 25),
                "c": getRandomIntInclusive(10, 25),
                "d": getRandomIntInclusive(10, 25),
            }
        }), {
        headers: { 'Content-Type': 'application/json' },
    });

    return res
}

const record = (location, timestamp) => {
    const res = http.get(`http://${server.host}:${server.port}/api/record?location=${location}\&date=2023-01-23`);

    return res;
}

const report = (location, timestamp) => {
    const res = http.get(`http://${server.host}:${server.port}/api/report?location=${location}\&date=2023-01-23`);

    return res;
}

export const options = {
    scenarios: {
        order: {
            executor: 'shared-iterations',
            vus: stage[__ENV.STAGE].vus, // number of threads
            iterations: stage[__ENV.STAGE].request_count,
            maxDuration: '20s',
            env: {"EXE": "ORDER"}
        },
        record: {
            executor: 'shared-iterations',
            vus: stage[__ENV.STAGE].vus, // number of threads
            iterations: stage[__ENV.STAGE].request_count,
            maxDuration: '20s',
            env: {"EXE": "REPORT"}
        },
        report: {
            executor: 'shared-iterations',
            vus: stage[__ENV.STAGE].vus, // number of threads
            iterations: stage[__ENV.STAGE].request_count,
            maxDuration: '20s',
            env: {"EXE": "RECORD"}
        },
        // crazy: {
        //     executor: 'shared-iterations',
        //     vus: 10, // number of threads
        //     iterations: 10,
        //     maxDuration: '20s',
        // }
    },
    // stages: [
    //   { duration: '5s', target: 10000 },
    //   { duration: '10s', target: 50000 },
    //   { duration: '5s', target: 0 },
    // ],
    thresholds: {},
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(95)', 'p(99)', 'p(99.99)', 'count'],
};

const MAP = {
    'REPORT': report,
    'RECORD': record,
    'ORDER': order
}

for (let key in options.scenarios) {
    // Each scenario automaticall tags the metrics it generates with its own name
    let thresholdName = `http_req_duration{scenario:${key}}`;
    // Check to prevent us from overwriting a threshold that already exists
    if (!options.thresholds[thresholdName]) {
        options.thresholds[thresholdName] = [];
    }
    // 'max>=0' is a bogus condition that will always be fulfilled
    options.thresholds[thresholdName].push('max>=0');
}

export default function () {

    const location = 'l' + getRandomIntInclusive(1, 5);
    const timestamp = new Date().toISOString();

    const res = MAP[__ENV['EXE']](location, timestamp)

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

}
