"""Generate web-friendly profile image variants.

This repository displays the profile picture as a 150x150 circle. To keep the *full* original
image visible without cropping and still look sharp on high-DPI displays, we generate:

* profile.jpg      (1x)
* profile@2x.jpg   (2x)

Input is taken from profile_full.jpg when present; otherwise profile.jpg is used.
"""

from PIL import Image
import os


def _resize_by_height(img: Image.Image, target_h: int) -> Image.Image:
    w, h = img.size
    if h <= target_h:
        return img.copy()
    target_w = round(w * (target_h / h))
    return img.resize((target_w, target_h), Image.Resampling.LANCZOS)


def generate_profile_variants():
    input_path = "profile_full.jpg" if os.path.exists("profile_full.jpg") else "profile.jpg"

    try:
        with Image.open(input_path) as img:
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            # 1x / 2x variants for a 150px display size
            img_1x = _resize_by_height(img, 600)
            img_2x = _resize_by_height(img, 1200)

            img_1x.save("profile.jpg", quality=92, optimize=True, progressive=True)
            img_2x.save("profile@2x.jpg", quality=92, optimize=True, progressive=True)

            print("Generated profile.jpg and profile@2x.jpg")

    except Exception as e:
        print(f"Error generating profile variants: {e}")


if __name__ == "__main__":
    generate_profile_variants()
