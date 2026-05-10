from fastapi import FastAPI, UploadFile, File
import shutil
from src.inference.predict import predict

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Plant Disease Detection API"}

@app.post("/predict")
async def get_prediction(file: UploadFile = File(...)):

    # Save uploaded image
    with open("temp.jpg", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Predict
    label, confidence = predict("temp.jpg")

    return {
        "prediction": label,
        "confidence": round(confidence * 100, 2)
    }