FROM ubuntu:20.04

ENV TERM=xterm
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    libopencv-dev \
    python3 \
    python3-opencv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app
ADD . /app
ADD cam.py .
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

ENTRYPOINT [ "python3","cam.py" ]
