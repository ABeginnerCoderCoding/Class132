//https://teachablemachine.withgoogle.com/models/HYJunUTMp/
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/HYJunUTMp/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model Loaded!');
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data = "You are " + predicition
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_status").innerHTML = results[0].label;
        if(results[0].label == "No Mask"){
            predicition = "not wearing a mask."
        }
        else if(results[0].label == "Mask not worn properly"){
            predicition = "not wearing your mask correctly."
        }
        else{
            predicition = "wearing your mask correctly"
        }
        speak();
}
}