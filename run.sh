docker-compose up -d influxdb grafana
echo "Grafana dashboard http://localhost:3000/d/k6/test-dashboard"
docker-compose run --rm k6 run -e HOSTNAME=support.avito.ru -e METHOD_NAME=api/1/getCatalog /scripts/test.js