import http from 'k6/http';
import { check, sleep } from "k6";

const isNumeric = (value) => /^\d+$/.test(value);

const default_vus = 5;

const target_vus_env = `${__ENV.TARGET_VUS}`;
const target_vus = isNumeric(target_vus_env) ? Number(target_vus_env) : default_vus;

export let options = {
    stages: [
        // Ramp-up from 1 to TARGET_VUS virtual users (VUs) in 2m
        { duration: "2m", target: target_vus },

        // Stay at rest on TARGET_VUS VUs for 10m
        { duration: "10m", target: target_vus },

        // Ramp-down from TARGET_VUS to 0 VUs for 2m
        { duration: "2m", target: 0 }
    ]
};

export default function () {
    const response = http.post(`http://${__ENV.HOSTNAME}/${__ENV.METHOD_NAME}`, {headers: {Accepts: "application/json"}});
    check(response, { "status is 200": (r) => r.status === 200 });
    sleep(.300);
};