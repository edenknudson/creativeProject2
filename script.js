//API key: d30032dc58a7c22e3f471a74999361eb

// All search requests should be made to the base search API URL. http://food2fork.com/api/search
// All recipe requests should be made to this URL: http://food2fork.com/api/get
//ex:http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken
var first;
var last;
$(document).ready(function() {

  $("#balancedButton").prop( "checked", true );
  $("#alcoholButton").prop( "checked", true );



  $("#foodSubmit").click(function(e) {
     e.preventDefault();

     first = 0;
     last = 10;
     var value = $("#foodInput").val();


     var diet = {
       choice: ""
     };

     if($("#balancedButton").prop("checked")){
       diet.choice = "balanced";
     }else if($("#proteinButton").prop("checked")){
       diet.choice = "high-protein";
     }else if($("#fatButton").prop("checked")){
       diet.choice = "low-fat";
     }else if($("#carbButton").prop("checked")){
       diet.choice = "low-carb";
     }else if($("#noneDietButton").prop("checked")){
       diet.choice = "";
     }

     var health = {
        choice: ""
     }

     if($("#alcoholButton").prop("checked")){
       health.choice = "alcohol-free";
     }else if($("#peanutButton").prop("checked")){
       health.choice = "peanut-free";
     }else if($("#sugarButton").prop("checked")){
       health.choice = "sugar-conscious";
     }else if($("#veganButton").prop("checked")){
       health.choice = "vegan";
     }else if($("#vegetarianButton").prop("checked")){
       health.choice = "vegetarian";
     }else if($("#noneHealthButton").prop("checked")){
       diet.choice = "";
     }

    console.log(value);

    if(health.choice != "" && diet.choice != ""){
      searchAll(value, diet, health);
    }else if(diet.choice != ""){
      searchDiet(value, diet);
    }else if(health.choice != ""){
      searchHealth(value, health);
    }else{
      searchNone(value);
    }


  });

});

function searchAll(value, diet, health){

  $.ajax({

    type: "GET",
    data: { q: value, app_id: "35a5939d", app_key: "351ac21caa15c6db8eb6b10cec10a3d2", diet: diet.choice, health: health.choice, from: first, to: last},
    dataType: 'json',
    url: "https://api.edamam.com/search",
      //url : myurl,
      //dataType : "json",
      success : function(json) {
          console.log(json);
          var results = "";
          results += '<h2>Number of recipes: ' + json.count + "</h2>";

          for(i=0;i<json.hits.length;i++){
              var num = first + i + 1;
              results += '<h3>'+ num + ". " + json.hits[i].recipe.label + '</h3>';
              results += '<img src="' + json.hits[i].recipe.image + '"/>'
              results += '<br>';
              results += '<a href="' + json.hits[i].recipe.url + '"><b>Link to recipe</b></a>';
              results += '<p><b>Calories</b>: ' + json.hits[i].recipe.calories + '</p>';
              results += '<p><b>Ingredients</b>: ';
              for(j=0;j<json.hits[i].recipe.ingredients.length;j++){
                results += json.hits[i].recipe.ingredients[j].text;
                if(j < json.hits[i].recipe.ingredients.length - 1){
                  results += ", ";
                }
              }
              results += '</p>';
              if(json.hits[i].recipe.cautions.length > 0){
                results += '<p><b>Cautions</b>: ';
                for(j=0;j<json.hits[i].recipe.cautions.length;j++){
                  results +=  json.hits[i].recipe.cautions[j];
                  if(j < json.hits[i].recipe.cautions.length - 1){
                    results += ", ";
                  }
                }
                results += '</p>';
              }

              results += '<br>';
              if(i < json.hits.length -1 ){
                results += '<hr>';
                results += '<br>';
              }else{
                results += '<br>';
                results += '<br>';
                results += '<br>';
              }
          }

          results += '<button type="button" id="NextButton" class="coolButton">Next</button>';
          results += '<button type="button" id="PrevButton" class="coolButton">Previous</button>';

          $("#foodDisplay").html(results);

          $("#NextButton").click(function(e) {

            first += 10;
            last += 10;

            var value = $("#foodInput").val();


            var diet = {
              choice: ""
            };

            if($("#balancedButton").prop("checked")){
              diet.choice = "balanced";
            }else if($("#proteinButton").prop("checked")){
              diet.choice = "high-protein";
            }else if($("#fatButton").prop("checked")){
              diet.choice = "low-fat";
            }else if($("#carbButton").prop("checked")){
              diet.choice = "low-carb";
            }

            var health = {
               choice: ""
            }

            if($("#alcoholButton").prop("checked")){
              health.choice = "alcohol-free";
            }else if($("#peanutButton").prop("checked")){
              health.choice = "peanut-free";
            }else if($("#sugarButton").prop("checked")){
              health.choice = "sugar-conscious";
            }else if($("#veganButton").prop("checked")){
              health.choice = "vegan";
            }else if($("#vegetarianButton").prop("checked")){
              health.choice = "vegetarian";
            }

           console.log(value);

           if(health.choice != "" && diet.choice != ""){
             searchAll(value, diet, health);
           }else if(diet.choice != ""){
             searchDiet(value, diet);
           }else if(health.choice != ""){
             searchHealth(value, health);
           }else{
             searchNone(value);
           }
           $('html, body').animate({ scrollTop: 0 }, 'fast');

          });

          $("#PrevButton").click(function(e) {

            if(first != 0){
              first -= 10;
              last -= 10;

              var value = $("#foodInput").val();


              var diet = {
                choice: ""
              };

              if($("#balancedButton").prop("checked")){
                diet.choice = "balanced";
              }else if($("#proteinButton").prop("checked")){
                diet.choice = "high-protein";
              }else if($("#fatButton").prop("checked")){
                diet.choice = "low-fat";
              }else if($("#carbButton").prop("checked")){
                diet.choice = "low-carb";
              }

              var health = {
                 choice: ""
              }

              if($("#alcoholButton").prop("checked")){
                health.choice = "alcohol-free";
              }else if($("#peanutButton").prop("checked")){
                health.choice = "peanut-free";
              }else if($("#sugarButton").prop("checked")){
                health.choice = "sugar-conscious";
              }else if($("#veganButton").prop("checked")){
                health.choice = "vegan";
              }else if($("#vegetarianButton").prop("checked")){
                health.choice = "vegetarian";
              }

             console.log(value);

             if(health.choice != "" && diet.choice != ""){
               searchAll(value, diet, health);
             }else if(diet.choice != ""){
               searchDiet(value, diet);
             }else if(health.choice != ""){
               searchHealth(value, health);
             }else{
               searchNone(value);
             }
             $('html, body').animate({ scrollTop: 0 }, 'fast');
            }

          });

      }
  });

}

function searchDiet(value, diet){

  $.ajax({

    type: "GET",
    data: { q: value, app_id: "35a5939d", app_key: "351ac21caa15c6db8eb6b10cec10a3d2", diet: diet.choice, from: first, to: last},
    dataType: 'json',
    url: "https://api.edamam.com/search",
      //url : myurl,
      //dataType : "json",
      success : function(json) {
          console.log(json);
          var results = "";
          results += '<h2>Number of recipes: ' + json.count + "</h2>";

          for(i=0;i<json.hits.length;i++){
              var num = first + i + 1;
              results += '<h3>'+ num + ". " + json.hits[i].recipe.label + '</h3>';
              results += '<img src="' + json.hits[i].recipe.image + '"/>'
              results += '<br>';
              results += '<a href="' + json.hits[i].recipe.url + '"><b>Link to recipe</b></a>';
              results += '<p><b>Calories</b>: ' + json.hits[i].recipe.calories + '</p>';
              results += '<p><b>Ingredients</b>: ';
              for(j=0;j<json.hits[i].recipe.ingredients.length;j++){
                results += json.hits[i].recipe.ingredients[j].text;
                if(j < json.hits[i].recipe.ingredients.length - 1){
                  results += ", ";
                }
              }
              results += '</p>';
              if(json.hits[i].recipe.cautions.length > 0){
                results += '<p><b>Cautions</b>: ';
                for(j=0;j<json.hits[i].recipe.cautions.length;j++){
                  results +=  json.hits[i].recipe.cautions[j];
                  if(j < json.hits[i].recipe.cautions.length - 1){
                    results += ", ";
                  }
                }
                results += '</p>';
              }

              results += '<br>';
              if(i < json.hits.length -1 ){
                results += '<hr>';
                results += '<br>';
              }else{
                results += '<br>';
                results += '<br>';
                results += '<br>';
              }
          }

          results += '<button type="button" id="NextButton" class="coolButton">Next</button>';
          results += '<button type="button" id="PrevButton" class="coolButton">Previous</button>';

          $("#foodDisplay").html(results);

          $("#NextButton").click(function(e) {

            first += 10;
            last += 10;

            var value = $("#foodInput").val();


            var diet = {
              choice: ""
            };

            if($("#balancedButton").prop("checked")){
              diet.choice = "balanced";
            }else if($("#proteinButton").prop("checked")){
              diet.choice = "high-protein";
            }else if($("#fatButton").prop("checked")){
              diet.choice = "low-fat";
            }else if($("#carbButton").prop("checked")){
              diet.choice = "low-carb";
            }

            var health = {
               choice: ""
            }

            if($("#alcoholButton").prop("checked")){
              health.choice = "alcohol-free";
            }else if($("#peanutButton").prop("checked")){
              health.choice = "peanut-free";
            }else if($("#sugarButton").prop("checked")){
              health.choice = "sugar-conscious";
            }else if($("#veganButton").prop("checked")){
              health.choice = "vegan";
            }else if($("#vegetarianButton").prop("checked")){
              health.choice = "vegetarian";
            }

           console.log(value);

           if(health.choice != "" && diet.choice != ""){
             searchAll(value, diet, health);
           }else if(diet.choice != ""){
             searchDiet(value, diet);
           }else if(health.choice != ""){
             searchHealth(value, health);
           }else{
             searchNone(value);
           }
           $('html, body').animate({ scrollTop: 0 }, 'fast');

          });

          $("#PrevButton").click(function(e) {

            if(first != 0){
              first -= 10;
              last -= 10;

              var value = $("#foodInput").val();


              var diet = {
                choice: ""
              };

              if($("#balancedButton").prop("checked")){
                diet.choice = "balanced";
              }else if($("#proteinButton").prop("checked")){
                diet.choice = "high-protein";
              }else if($("#fatButton").prop("checked")){
                diet.choice = "low-fat";
              }else if($("#carbButton").prop("checked")){
                diet.choice = "low-carb";
              }

              var health = {
                 choice: ""
              }

              if($("#alcoholButton").prop("checked")){
                health.choice = "alcohol-free";
              }else if($("#peanutButton").prop("checked")){
                health.choice = "peanut-free";
              }else if($("#sugarButton").prop("checked")){
                health.choice = "sugar-conscious";
              }else if($("#veganButton").prop("checked")){
                health.choice = "vegan";
              }else if($("#vegetarianButton").prop("checked")){
                health.choice = "vegetarian";
              }

             console.log(value);

             if(health.choice != "" && diet.choice != ""){
               searchAll(value, diet, health);
             }else if(diet.choice != ""){
               searchDiet(value, diet);
             }else if(health.choice != ""){
               searchHealth(value, health);
             }else{
               searchNone(value);
             }
             $('html, body').animate({ scrollTop: 0 }, 'fast');
            }

          });

      }
  });

}

function searchHealth(value, health){

  $.ajax({

    type: "GET",
    data: { q: value, app_id: "35a5939d", app_key: "351ac21caa15c6db8eb6b10cec10a3d2", health: health.choice, from: first, to: last},
    dataType: 'json',
    url: "https://api.edamam.com/search",
      //url : myurl,
      //dataType : "json",
      success : function(json) {
          console.log(json);
          var results = "";
          results += '<h2>Number of recipes: ' + json.count + "</h2>";

          for(i=0;i<json.hits.length;i++){
              var num = first + i + 1;
              results += '<h3>'+ num + ". " + json.hits[i].recipe.label + '</h3>';
              results += '<img src="' + json.hits[i].recipe.image + '"/>'
              results += '<br>';
              results += '<a href="' + json.hits[i].recipe.url + '"><b>Link to recipe</b></a>';
              results += '<p><b>Calories</b>: ' + json.hits[i].recipe.calories + '</p>';
              results += '<p><b>Ingredients</b>: ';
              for(j=0;j<json.hits[i].recipe.ingredients.length;j++){
                results += json.hits[i].recipe.ingredients[j].text;
                if(j < json.hits[i].recipe.ingredients.length - 1){
                  results += ", ";
                }
              }
              results += '</p>';
              if(json.hits[i].recipe.cautions.length > 0){
                results += '<p><b>Cautions</b>: ';
                for(j=0;j<json.hits[i].recipe.cautions.length;j++){
                  results +=  json.hits[i].recipe.cautions[j];
                  if(j < json.hits[i].recipe.cautions.length - 1){
                    results += ", ";
                  }
                }
                results += '</p>';
              }

              results += '<br>';
              if(i < json.hits.length -1 ){
                results += '<hr>';
                results += '<br>';
              }else{
                results += '<br>';
                results += '<br>';
                results += '<br>';
              }
          }

          results += '<button type="button" id="NextButton" class="coolButton">Next</button>';
          results += '<button type="button" id="PrevButton" class="coolButton">Previous</button>';

          $("#foodDisplay").html(results);

          $("#NextButton").click(function(e) {

            first += 10;
            last += 10;

            var value = $("#foodInput").val();


            var diet = {
              choice: ""
            };

            if($("#balancedButton").prop("checked")){
              diet.choice = "balanced";
            }else if($("#proteinButton").prop("checked")){
              diet.choice = "high-protein";
            }else if($("#fatButton").prop("checked")){
              diet.choice = "low-fat";
            }else if($("#carbButton").prop("checked")){
              diet.choice = "low-carb";
            }

            var health = {
               choice: ""
            }

            if($("#alcoholButton").prop("checked")){
              health.choice = "alcohol-free";
            }else if($("#peanutButton").prop("checked")){
              health.choice = "peanut-free";
            }else if($("#sugarButton").prop("checked")){
              health.choice = "sugar-conscious";
            }else if($("#veganButton").prop("checked")){
              health.choice = "vegan";
            }else if($("#vegetarianButton").prop("checked")){
              health.choice = "vegetarian";
            }

           console.log(value);

           if(health.choice != "" && diet.choice != ""){
             searchAll(value, diet, health);
           }else if(diet.choice != ""){
             searchDiet(value, diet);
           }else if(health.choice != ""){
             searchHealth(value, health);
           }else{
             searchNone(value);
           }
           $('html, body').animate({ scrollTop: 0 }, 'fast');

          });

          $("#PrevButton").click(function(e) {

            if(first != 0){
              first -= 10;
              last -= 10;

              var value = $("#foodInput").val();


              var diet = {
                choice: ""
              };

              if($("#balancedButton").prop("checked")){
                diet.choice = "balanced";
              }else if($("#proteinButton").prop("checked")){
                diet.choice = "high-protein";
              }else if($("#fatButton").prop("checked")){
                diet.choice = "low-fat";
              }else if($("#carbButton").prop("checked")){
                diet.choice = "low-carb";
              }

              var health = {
                 choice: ""
              }

              if($("#alcoholButton").prop("checked")){
                health.choice = "alcohol-free";
              }else if($("#peanutButton").prop("checked")){
                health.choice = "peanut-free";
              }else if($("#sugarButton").prop("checked")){
                health.choice = "sugar-conscious";
              }else if($("#veganButton").prop("checked")){
                health.choice = "vegan";
              }else if($("#vegetarianButton").prop("checked")){
                health.choice = "vegetarian";
              }

             console.log(value);

             if(health.choice != "" && diet.choice != ""){
               searchAll(value, diet, health);
             }else if(diet.choice != ""){
               searchDiet(value, diet);
             }else if(health.choice != ""){
               searchHealth(value, health);
             }else{
               searchNone(value);
             }
             $('html, body').animate({ scrollTop: 0 }, 'fast');
            }

          });

      }
  });

}

function searchNone(value){

  $.ajax({

    type: "GET",
    data: { q: value, app_id: "35a5939d", app_key: "351ac21caa15c6db8eb6b10cec10a3d2", from: first, to: last},
    dataType: 'json',
    url: "https://api.edamam.com/search",
      //url : myurl,
      //dataType : "json",
      success : function(json) {
          console.log(json);
          var results = "";
          results += '<h2>Number of recipes: ' + json.count + "</h2>";

          for(i=0;i<json.hits.length;i++){
              var num = first + i + 1;
              results += '<h3>'+ num + ". " + json.hits[i].recipe.label + '</h3>';
              results += '<img src="' + json.hits[i].recipe.image + '"/>'
              results += '<br>';
              results += '<a href="' + json.hits[i].recipe.url + '"><b>Link to recipe</b></a>';
              results += '<p><b>Calories</b>: ' + json.hits[i].recipe.calories + '</p>';
              results += '<p><b>Ingredients</b>: ';
              for(j=0;j<json.hits[i].recipe.ingredients.length;j++){
                results += json.hits[i].recipe.ingredients[j].text;
                if(j < json.hits[i].recipe.ingredients.length - 1){
                  results += ", ";
                }
              }
              results += '</p>';
              if(json.hits[i].recipe.cautions.length > 0){
                results += '<p><b>Cautions</b>: ';
                for(j=0;j<json.hits[i].recipe.cautions.length;j++){
                  results +=  json.hits[i].recipe.cautions[j];
                  if(j < json.hits[i].recipe.cautions.length - 1){
                    results += ", ";
                  }
                }
                results += '</p>';
              }

              results += '<br>';
              if(i < json.hits.length -1 ){
                results += '<hr>';
                results += '<br>';
              }else{
                results += '<br>';
                results += '<br>';
                results += '<br>';
              }
          }

          results += '<button type="button" id="NextButton" class="coolButton">Next</button>';
          results += '<button type="button" id="PrevButton" class="coolButton">Previous</button>';

          $("#foodDisplay").html(results);

          $("#NextButton").click(function(e) {

            first += 10;
            last += 10;

            var value = $("#foodInput").val();


            var diet = {
              choice: ""
            };

            if($("#balancedButton").prop("checked")){
              diet.choice = "balanced";
            }else if($("#proteinButton").prop("checked")){
              diet.choice = "high-protein";
            }else if($("#fatButton").prop("checked")){
              diet.choice = "low-fat";
            }else if($("#carbButton").prop("checked")){
              diet.choice = "low-carb";
            }

            var health = {
               choice: ""
            }

            if($("#alcoholButton").prop("checked")){
              health.choice = "alcohol-free";
            }else if($("#peanutButton").prop("checked")){
              health.choice = "peanut-free";
            }else if($("#sugarButton").prop("checked")){
              health.choice = "sugar-conscious";
            }else if($("#veganButton").prop("checked")){
              health.choice = "vegan";
            }else if($("#vegetarianButton").prop("checked")){
              health.choice = "vegetarian";
            }

           console.log(value);

           if(health.choice != "" && diet.choice != ""){
             searchAll(value, diet, health);
           }else if(diet.choice != ""){
             searchDiet(value, diet);
           }else if(health.choice != ""){
             searchHealth(value, health);
           }else{
             searchNone(value);
           }
           $('html, body').animate({ scrollTop: 0 }, 'fast');

          });

          $("#PrevButton").click(function(e) {

            if(first != 0){
              first -= 10;
              last -= 10;

              var value = $("#foodInput").val();


              var diet = {
                choice: ""
              };

              if($("#balancedButton").prop("checked")){
                diet.choice = "balanced";
              }else if($("#proteinButton").prop("checked")){
                diet.choice = "high-protein";
              }else if($("#fatButton").prop("checked")){
                diet.choice = "low-fat";
              }else if($("#carbButton").prop("checked")){
                diet.choice = "low-carb";
              }

              var health = {
                 choice: ""
              }

              if($("#alcoholButton").prop("checked")){
                health.choice = "alcohol-free";
              }else if($("#peanutButton").prop("checked")){
                health.choice = "peanut-free";
              }else if($("#sugarButton").prop("checked")){
                health.choice = "sugar-conscious";
              }else if($("#veganButton").prop("checked")){
                health.choice = "vegan";
              }else if($("#vegetarianButton").prop("checked")){
                health.choice = "vegetarian";
              }

             console.log(value);

             if(health.choice != "" && diet.choice != ""){
               searchAll(value, diet, health);
             }else if(diet.choice != ""){
               searchDiet(value, diet);
             }else if(health.choice != ""){
               searchHealth(value, health);
             }else{
               searchNone(value);
             }
             $('html, body').animate({ scrollTop: 0 }, 'fast');
            }

          });

      }
  });

}
