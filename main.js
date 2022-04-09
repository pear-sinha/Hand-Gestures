Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"></img>';
    });
}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/rpzMcQwNA/model.json', modelReady);

function modelReady(){
    console.log('Model Ready!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data= "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;" + "This looks amazing!";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;" + "That was a marvelouos victory!";
        }
        if(results[0].label == "Good"){
            document.getElementById("update_emoji").innerHTML = "&#128077;" + "All the best";
        }
        if(results[0].label == "Love"){
            document.getElementById("update_emoji").innerHTML = "&#129304;;" + "I love you!";
        }
        if(results[0].label == "Bad"){
            document.getElementById("update_emoji").innerHTML = "&#128078;" + "This is bad :(";
        }
        if(results[0].label == "Wave"){
            document.getElementById("update_emoji").innerHTML = "&#128075;" + "Hi! OR Hello! OR Bye!";
        }
        if(results[0].label == "Up"){
            document.getElementById("update_emoji").innerHTML = "&#128070;" + "Look up!";
        }
        if(results[0].label == "Down"){
            document.getElementById("update_emoji").innerHTML = "&#128071;" + "Look down!";
        }
    }
}