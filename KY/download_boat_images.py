import os
import requests
from bs4 import BeautifulSoup
import zipfile

# List of boat page URLs
urls = [
    "https://www.cigarettetennessee.com/boats/59-tirranna",
    "https://www.cigarettetennessee.com/boats/41-nighthawk-sd-edition",
    "https://www.cigarettetennessee.com/boats/42-nighteagle",
    "https://www.cigarettetennessee.com/boats/515-cigarette",
    "https://www.cigarettetennessee.com/boats/41-nighthawk",
    "https://www.cigarettetennessee.com/boats/42-auroris",
    "https://www.cigarettetennessee.com/boats/42x",
    "https://www.cigarettetennessee.com/boats/52-thunder",
]

# Create uploads directory
os.makedirs('uploads', exist_ok=True)

# Download images from each page
for url in urls:
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, 'html.parser')
    # Target the gallery if available, otherwise scan all images
    gallery = soup.find('div', class_='gallery') or soup
    for img in gallery.find_all('img'):
        src = img.get('src')
        if not src:
            continue
        # Resolve relative URLs
        if src.startswith('/'):
            img_url = f"https://www.cigarettetennessee.com{src}"
        else:
            img_url = src
        filename = os.path.basename(img_url.split('?')[0])
        try:
            img_data = requests.get(img_url).content
            with open(os.path.join('uploads', filename), 'wb') as f:
                f.write(img_data)
            print(f"Downloaded {filename}")
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")

# Zip the uploads folder
with zipfile.ZipFile('boat_uploads.zip', 'w') as zipf:
    for root, _, files in os.walk('uploads'):
        for file in files:
            full_path = os.path.join(root, file)
            zipf.write(full_path, arcname=os.path.join('uploads', file))

print("Created boat_uploads.zip containing all downloaded images.")
