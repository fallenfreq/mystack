#!/bin/bash

# Get the current script directory
# realpath came from brew install coreutils
SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

cd "$SCRIPT_DIR"

# Define the log file
LOG_FILE="./certificate_generation.log"

# Redirect all output to the log file
exec &> >(tee -a "$LOG_FILE")

echo "Changed to $SCRIPT_DIR directory"

# Set paths to OpenSSL binary
OPENSSL_BIN="/usr/local/opt/openssl@3/bin/openssl"

# Define filenames
CSR_FILE="dev.csr"
CRT_FILE="dev.crt"
PEM_FILE="fullchain.pem"
KEY_FILE="privkey.pem"
CA_CERT="./certificate_authority/devca.pem"
CA_KEY="./certificate_authority/devca.key"

# Clean up any existing files
rm -f "$KEY_FILE" "$CSR_FILE" "$CRT_FILE" "$PEM_FILE" 

# Generate a new private key and CSR
$OPENSSL_BIN req -new -nodes -newkey rsa:2048 -keyout "$KEY_FILE" -out "$CSR_FILE" \
  -subj "/C=UK/CN=localhost/O=CatsDog" \
  -addext "subjectAltName=DNS:localhost,DNS:dev.localhost,DNS:*.dev.localhost,IP:127.0.0.1" \
  -addext "extendedKeyUsage=clientAuth" &&

# Sign the CSR with the CA certificate to generate a new certificate
$OPENSSL_BIN x509 -req -sha256 -days 397 -in "$CSR_FILE" \
  -CA "$CA_CERT" \
  -CAkey "$CA_KEY" \
  -CAcreateserial \
  -out "$CRT_FILE" \
  -extfile <(cat <<EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
subjectAltName=DNS:localhost,DNS:dev.localhost,DNS:*.dev.localhost,IP:127.0.0.1
keyUsage=digitalSignature,nonRepudiation,keyEncipherment,dataEncipherment
extendedKeyUsage=clientAuth,serverAuth
EOF
) &&

# Concatenate the key and certificate into a single PEM file
cat "$KEY_FILE" "$CRT_FILE" > "$PEM_FILE" 

# Inform the user
echo "Certificate generation complete. Files created:" 
echo "- Private Key: $KEY_FILE" 
echo "- Certificate Signing Request: $CSR_FILE" 
echo "- Certificate: $CRT_FILE" 
echo "- Combined PEM: $PEM_FILE"
