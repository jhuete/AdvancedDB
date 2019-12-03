    var genElectricStock = 80;
    var graph_data = [];
    var changeDate = new Date();
    var changeDateFormat = "";
    //x: '2012-02-24 09:00:00', y: 20000
    function initializeDB(){
        var firebaseConfig = {
            apiKey: "AIzaSyBI9BzZ2I0SJn9Dlb1Qjwe4EYbrzKW5HIw",
            authDomain: "advanceddbfirebase.firebaseapp.com",
            databaseURL: "https://advanceddbfirebase.firebaseio.com",
            projectId: "advanceddbfirebase",
            storageBucket: "advanceddbfirebase.appspot.com",
            messagingSenderId: "796371083960",
            appId: "1:796371083960:web:955b92a805aef82161ca4d",
            measurementId: "G-FL2KNQBKFK"
        };

        firebase.initializeApp(firebaseConfig);
        var firebaseConn = firebase.database();

        // var starCountRef = firebaseConn.ref('stock/General_Electric');
        // starCountRef.on('value', snap => genElectricStock = snap.val());

        var starCountRef = firebaseConn.ref('stock/General_Electric');
        starCountRef.on('value', function(snapshot) {
            genElectricStock = snapshot.val();
            changeDate = new Date();
            changeDateFormat = changeDate.getFullYear() + "-" + changeDate.getMonth() + "-" + changeDate.getDay() + " " + changeDate.getHours() + ":" + changeDate.getMinutes() + ":" + changeDate.getSeconds();
            graph_data.push({x:changeDateFormat, y:genElectricStock});
            console.log(changeDateFormat);
            console.log(genElectricStock);
            console.log(graph_data);
        });
        
    }

    // function updateStarCount(genElectricStock, value) {
    //     genElectricStock = value;
    //     //console.log(genElectricStock);
    // }