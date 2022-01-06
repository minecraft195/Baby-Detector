var R = "";
var G = "";
var B = "";
var img = "";
var status = "";
objects = "";
function preload()
{
    img = loadImage('download.jpg')
    wambulance = loadSound("song.wav")
}
function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw()
{
    image(img, 0, 0, 640, 420);
    if(status != "")
    {
      for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";

          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height + 15);
          if(objects[i].label == "person"){
            document.getElementById("status_baby").innerHTML = "Baby Found";
          }
          if(objects[i].label != "person")
          {
              document.getElementById("status_baby").innerHTML = "No Baby Found";
              wambulance.play()
          }
      }
    }
  
}