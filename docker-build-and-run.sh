rm -rf ./frontend/dist
npm --prefix ./frontend run build

docker-compose up --build