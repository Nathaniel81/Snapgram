FROM python:3.11.4-slim-bullseye
WORKDIR /app

# Install GCC

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# install system dependencies
# RUN apt-get update && apt-get install -y gcc
RUN apt-get update && apt-get install -y python3-venv
RUN apt-get install -y build-essential

# create and activate virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# install dependencies
COPY ./requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "gunicorn", "snapgram.asgi", "-b", "0.0.0.0:8000"]
