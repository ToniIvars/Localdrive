FROM python:3.10-slim

WORKDIR /app

COPY . .
RUN pip install -r requirements.txt --no-cache-dir

EXPOSE 8000
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0"]
