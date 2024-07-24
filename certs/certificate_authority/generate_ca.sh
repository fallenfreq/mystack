#!/bin/bash

# Get the current script directory
# realpath came from brew install coreutils
SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

cd "$SCRIPT_DIR"

# Define the log file
LOG_FILE="./ca_generation.log"

# Redirect all output to the log file
exec &> >(tee -a "$LOG_FILE")

echo "Changed to $SCRIPT_DIR directory"

# Set paths to OpenSSL binary
OPENSSL_BIN="/usr/local/opt/openssl@3/bin/openssl"

# ca common name
CN="devca"

# Define filenames
CA_CERT="./devca.pem"
CA_KEY="./devca.key"
ORGANISATION="dev"

# generate key
$OPENSSL_BIN genpkey -algorithm RSA -out "$CA_KEY" -pkeyopt rsa_keygen_bits:2048 \
&&

# Generate the CA certificate
$OPENSSL_BIN req -new -x509 -key "$CA_KEY" -out "$CA_CERT" -days 3650 -subj "/C=UK/O=${ORGANISATION} CA/CN=${CN}" -extensions v3_ca -config <(cat <<EOF
[ req ]
distinguished_name = req_distinguished_name
x509_extensions = v3_ca
prompt = no

[ req_distinguished_name ]
C = UK
CN = $CN

[ v3_ca ]
basicConstraints = critical,CA:TRUE
keyUsage = critical,keyCertSign,cRLSign
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
EOF
)