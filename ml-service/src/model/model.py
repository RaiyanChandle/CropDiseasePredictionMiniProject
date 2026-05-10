from torchvision import models
import torch.nn as nn

def get_model(num_classes):
    model = models.efficientnet_b0(weights="DEFAULT")
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    return model