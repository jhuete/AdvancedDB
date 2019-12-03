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
	
//--------------------------------------------------------
//--------------------------------------------------------

    var genElectricStock = 80;
    
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

        //console.log(firebaseConfig)

        firebase.initializeApp(firebaseConfig);
        //var firebaseConn = firebase.database();

        //var starCountRef = firebaseConn.ref('stock/General_Electric');
        //starCountRef.on('value', snap => genElectricStock = snap.val());
        
        setAverageUpdate();
    }

    function writeNewValue(companyName, stockValue){
        //var dbRef = initializeDB();
        var dbRef = firebase.database();
        dbRef.ref('stock/General_Electric').set(19.9);
    }

    function executeQuery(){
        var dbRef = firebase.database();

        // dbRef.ref('stockValue/Month/January').orderByKey().on("child_added", function(snapshot) {
        //     console.log("New stock value: " + snapshot.val());
        // });

        // var strMonth = "January";
        // dbRef.ref('stockValue/Month/'+strMonth).orderByValue().on("value", function(snapshot) {
        //     snapshot.forEach(function(data) {
        //         console.log("Stock value on " + strMonth + " " + data.key + " is " + data.val());
        //     });
        // });

        var strMonth = "January";
        dbRef.ref('stockValue/Month/'+strMonth).orderByChild("01").limitToLast(3).on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                console.log("Stock value on " + strMonth + " " + data.key + " is " + data.val());
            });
        });
    }

    // function updateStarCount(genElectricStock, value) {
    //     genElectricStock = value;
    //     //console.log(genElectricStock);
    // }

    function showTicketPrices(m, d){
        var dbRef = firebase.database();

        dbRef.ref('Test/Feb/01').off("value");
        dbRef.ref('Test/Feb/02').off("value");
        dbRef.ref('Test/Feb/03').off("value");
        // dbRef.ref('Test').once("value", function(test) {
        //     test.forEach(function(month) {
        //         month.forEach(function(day) {
        //             day.ref.off("value");
        //         });
        //     });
        // });

        document.getElementById("testTableHeader").innerHTML = "Flights for "+d+"/"+m+"/2020";

        dbRef.ref('Test/'+m+'/'+d).orderByValue().limitToFirst(3).on("value", function(day) {
            var newHTMLcontent = "";
            var n = 1;
            day.forEach(function(letter) {
                //console.log("Data Key: " + letter.key + " Data Value: " + letter.val());
                newHTMLcontent += '<tr><th scope="row">'+n+'</th><td>'+letter.key+'</td><td>€ '+letter.val()+'</td></tr>';
                n++;
            });
            document.getElementById("testTable").innerHTML = newHTMLcontent;
        });
    }

    function setAverageUpdate(){
        var dbRef = firebase.database();

        dbRef.ref('stockValue/Month/February').orderByKey().endAt("31").on("value", function(month) {
            var n = 0;
            var avg = 0;
            var sum = 0;
            month.forEach(function(day) {
                //console.log("Data Key: " + day.key + " Data Value: " + day.val());
                sum += day.val();
                n++;
            });

            if(n == 0) avg = 0;
            else{
                avg = sum / n;
            }

            dbRef.ref('stockValue/Month/February/Average').set(avg);
        });
    }

    function updateTable(){
        var newMonth = document.getElementById("inputText3").value;
        var newDay = document.getElementById("inputText4").value;

        showTicketPrices(newMonth, newDay);
    }