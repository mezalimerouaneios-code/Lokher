from PIL import Image
import os

input_dir = r"c:/Users/fifig/Desktop/Lokher/extracted_images"
output_dir = r"c:/Users/fifig/Desktop/Lokher/extracted_images/compressed"
os.makedirs(output_dir, exist_ok=True)

max_width = 1920
quality = 80

for filename in os.listdir(input_dir):
    if filename.lower().endswith(".png"):
        img_path = os.path.join(input_dir, filename)
        img = Image.open(img_path)

        if img.mode == "RGBA":
            img = img.convert("RGB")

        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

        output_filename = os.path.splitext(filename)[0] + ".jpg"
        output_path = os.path.join(output_dir, output_filename)
        img.save(output_path, "JPEG", quality=quality)
        print(f"Compressed: {filename} -> {output_filename}")

print("Done!")
