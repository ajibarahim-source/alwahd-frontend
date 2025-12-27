import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import time

# إعداد التطبيق (FastAPI)
app = FastAPI()

# تفعيل CORS للسماح للواجهة الأمامية بالاتصال
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# القوانين الأساسية لنموذج F-Lambda
class FLambdaCore:
    F_LAMBDA = 15.0725

    @staticmethod
    def encode(data: str):
        # تحويل النص إلى بصمات طيفية
        raw_bytes = data.encode('utf-8')
        signals = []
        for i, byte in enumerate(raw_bytes):
            signal = (byte * FLambdaCore.F_LAMBDA + (i + 1)) % 1.0
            signals.append(float(f"{signal:.12f}"))
        return signals

    @staticmethod
    def decode(signals):
        # استعادة النص من البصمات الطيفية (علاقة عكسية حتمية)
        reconstructed = bytearray()
        for i, sig in enumerate(signals):
            found = False
            for byte_val in range(256):
                test_sig = (byte_val * FLambdaCore.F_LAMBDA + (i + 1)) % 1.0
                if abs(test_sig - sig) < 1e-9:
                    reconstructed.append(byte_val)
                    found = True
                    break
            if not found: return None
        return reconstructed.decode('utf-8', errors='ignore')

# نموذج استقبال البيانات
class DataInput(BaseModel):
    content: str

# المسار الرئيسي (لفحص الحالة)
@app.get("/")
async def root():
    return {"status": "Online", "model": "F-Lambda v2.5"}

# المسار الخاص بمعالجة البيانات (الربط مع الـ Frontend)
@app.post("/process")
async def process_data(data: DataInput):
    try:
        start_time = time.time()
        
        # تنفيذ العمليات الفيزيائية
        signatures = FLambdaCore.encode(data.content)
        recovered = FLambdaCore.decode(signatures)
        
        duration = time.time() - start_time
        
        return {
            "success": True,
            "signature_count": len(signatures),
            "signatures_sample": signatures[:10],
            "processing_time": f"{duration:.4f}s",
            "integrity": data.content == recovered,
            "recovered_content": recovered
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# تشغيل الخادم
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

