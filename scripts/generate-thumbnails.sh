#!/bin/bash

# Create thumbnails directory if it doesn't exist
mkdir -p public/thumbnails

# Function to generate thumbnail
generate_thumbnail() {
    video_path="$1"
    # Extract filename without extension
    filename=$(basename "$video_path")
    filename_noext="${filename%.*}"
    
    echo "Generating thumbnail for $filename..."
    
    # Generate thumbnail at 2 seconds in
    # -ss: seek to position (in seconds)
    # -frames:v 1: capture only one frame
    # -vf scale=480:-1: resize to 480px width, maintain aspect ratio
    # -quality 90: high quality JPEG
    ffmpeg -ss 00:00:20 \
           -i "$video_path" \
           -frames:v 1 \
           -vf "scale=480:-1" \
           -quality 90 \
           "public/thumbnails/${filename_noext}.jpg" \
           -y
}

# Check if directory argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <path-to-videos-directory>"
    exit 1
fi

# Process all video files in the specified directory
find "$1" -type f \( -name "*.mp4" -o -name "*.mov" -o -name "*.mkv" \) | while read video; do
    generate_thumbnail "$video"
done

echo "Thumbnail generation complete! Thumbnails are in public/thumbnails/" 