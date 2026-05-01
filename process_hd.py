import os
import pillow_heif
from PIL import Image

pillow_heif.register_heif_opener()

INPUT_DIR = r"C:\Users\fifig\Desktop\Lokher\HD Images"
OUTPUT_DIR = r"C:\Users\fifig\Desktop\Lokher\extracted_images\web_hd"
MAX_SIZE = 1920

for root, dirs, files in os.walk(INPUT_DIR):
    for filename in files:
        input_path = os.path.join(root, filename)
        rel_path = os.path.relpath(input_path, INPUT_DIR)
        output_dir = os.path.join(OUTPUT_DIR, os.path.dirname(rel_path))
        base_name = os.path.splitext(os.path.basename(filename))[0]
        output_path = os.path.join(output_dir, f"{base_name}.jpg")

        os.makedirs(output_dir, exist_ok=True)

        img = Image.open(input_path)
        img = img.convert("RGB")

        max_dim = max(img.size)
        if max_dim > MAX_SIZE:
            ratio = MAX_SIZE / max_dim
            new_size = tuple(int(dim * ratio) for dim in img.size)
            img = img.resize(new_size, Image.LANCZOS)

        img.save(output_path, "JPEG", quality=80)
        print(f"Processed: {rel_path} -> {output_path}")
