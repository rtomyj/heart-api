if [ $# -eq 0 ]
	then
		echo "Need server name"
		exit 1
fi

SERVER=$1
USER="ec2-user"
DIR_ON_SERVER="heart-api"

echo "Using server $SERVER and directory $DIR_ON_SERVER to sync prod API"

echo "Uploading API files"
rsync -avz -e "ssh -i ~/.ssh/skc-server.pem" docker-compose.yml "${USER}@${SERVER}:${DIR_ON_SERVER}/"
rsync -avz -e "ssh -i ~/.ssh/skc-server.pem" -r dist/* "${USER}@${SERVER}:${DIR_ON_SERVER}/dist/"

echo "Restaging API"
ssh -i ~/.ssh/skc-server.pem "${USER}@${SERVER}" << EOF
	cd "$DIR_ON_SERVER"
	docker-compose kill
	docker-compose rm -f
	docker-compose pull
	docker-compose up -d
EOF

bash aws-cert-update.sh