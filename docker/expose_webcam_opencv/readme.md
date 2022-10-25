docker build -t dockercam .
xhost + & docker run -it -v $PWD:/app/ --device=/dev/video0:/dev/video0 -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY dockercam