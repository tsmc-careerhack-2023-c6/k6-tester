var server = {
    host: "10.100.11.1",
    port: 80,
    // host: "10.100.11.3",
    // port: 30009,
    // send_endpoint: "api/inventory",
    // query_endpoint: "api/report",
};

var stage = {
    '1': {
        'vus': 100,
        'request_count': 5000
    },
    '2': {
        'vus': 100,
        'request_count': 20000
    },
    '3': {
        'vus': 100,
        'request_count': 20000
    },
    '4': {
        'vus': 100,
        'request_count': 20000
    },
    '5': {
        'vus': 200,
        'request_count': 10000
    },
    '6': {
        'vus': 500,
        'request_count': 10000
    },
    '7': {
        'vus': 1000,
        'request_count': 10000
    },
    '8': {
        'vus': 10000,
        'request_count': 20000
    }
}

export {
    server, stage
};