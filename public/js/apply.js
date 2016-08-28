'use strict';
var config = {
    apiKey: "AIzaSyDgPRKXoy3DAxXCWsCwri-uUbT1s1pGMxI",
    authDomain: "trailblazer-4b254.firebaseapp.com",
    databaseURL: "https://trailblazer-4b254.firebaseio.com",
    storageBucket: "trailblazer-4b254.appspot.com",
};
firebase.initializeApp(config);

var tr = function tr() {
    document.getElementById("uploadBtn").onchange = function () {
        document.getElementById("uploadFile").value = this.files[0].name;
    };
    document.getElementById('apply').addEventListener('click', function (evt) {
      
        var data = JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            m_number: document.getElementById('mNo').value
        })
        fetch('/setUser', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: data
        }).then(function (data) {
            console.log(data);
           
        //     return data.json();
        // }).then(function(firebase){
            //  var progress = document.querySelector('.progress');
            // progress.classList.add('show');
        var storage = firebase.storage().ref();
        var file = document.getElementById("uploadBtn").files[0];
        var fileRef = storage.child('resume/'+document.getElementById('email').value+'/' +file.name);
        var task = fileRef.put(file);
        task.on('state_changed',function progress(snapshot){
           var parcentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        //    document.querySelector('.progress').setAttribute('value',`${parcentage}`);
        // document.querySelector('.progress').MaterialProgress.setProgress(44);
        },function error(err){

        },function completed(){
            document.querySelector('.msg').classList.add('show');
        })
        })
    })

} ();