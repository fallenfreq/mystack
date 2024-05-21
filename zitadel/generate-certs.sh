# Check if file exists to see if script has already run
if [ -e /certs/ca.key ]; then
    echo "Some files exist already."
    ls /certs/
    exit 0  # Exit with success status
fi    

# create ca certificate
cockroach cert create-ca \
  --certs-dir /certs \
  --ca-key /certs/ca.key \
  &&

# create node certificate
cockroach cert create-node \
  $ZITADEL_EXTERNALDOMAIN \
  cockroach-db \
  $MY_ZITADEL_EXTERNALIP \
  --certs-dir /certs \
  --ca-key /certs/ca.key \
  &&

# create root client certificate used by cockroach
#--also-generate-pkcs8-key only needed for java apps
cockroach cert create-client \
  root \
  --overwrite \
  --certs-dir /certs \
  --ca-key /certs/ca.key \
  &&
  # --also-generate-pkcs8-key

cp /ui-certs/fullchain.pem /certs/ui.crt \
&&
cp /ui-certs/privkey.pem /certs/ui.key \
&&
cp /certs/* /zitadel-certs/ \
&&

# create user client certificate
cockroach cert create-client \
  zitadel_user \
  --overwrite \
  --certs-dir /zitadel-certs/ \
  --ca-key /zitadel-certs/ca.key \
&&

chown 1000:1000 /zitadel-certs/*