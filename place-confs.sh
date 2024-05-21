#!/bin/bash

set -e

# Define source directory and merge directory
local_myconfs_dir="/etc/nginx/local-myconfs"
merge_dir="/etc/nginx/myconfs"

# Function to merge or copy files
merge() {
    local file="$1"
    local filename=$(basename "$file")

    # Check if the filename matches the pattern
    if [[ ! "$filename" =~ ^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.conf$ ]]; then
        echo "Skipping $filename: Invalid filename format."
        return
    fi
    
    local src_dir=$(echo "$filename" | cut -d. -f2).conf.d

    echo "Copying $filename..."
    mkdir -p "$merge_dir/$src_dir"
    cp "$file" "$merge_dir/$src_dir/$filename"
}

# Iterate through files in local-myconfs directory
for file in "$local_myconfs_dir"/*; do
    merge "$file"
done

echo "Merge completed."
