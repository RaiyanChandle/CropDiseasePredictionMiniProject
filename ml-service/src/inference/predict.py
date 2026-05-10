import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
from src.model.model import get_model

# =========================
# LOAD CLASSES
# =========================
with open("classes.txt") as f:
    classes = [line.strip() for line in f.readlines()]

# =========================
# DEVICE
# =========================
device = torch.device("cpu")

# =========================
# LOAD MODEL ONCE
# =========================
model = get_model(len(classes))
model.load_state_dict(torch.load("models/best_model.pth", map_location=device))
model.to(device)
model.eval()

print("✅ Model loaded")

# =========================
# TRANSFORM (IMPORTANT)
# =========================
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor()
])

# =========================
# PREDICT FUNCTION
# =========================
def predict(image_path):
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)
        probs = F.softmax(output, dim=1)
        conf, pred = torch.max(probs, 1)

    return classes[pred.item()], float(conf.item())