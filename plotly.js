//describeID is a function that allows to filter and get data for selected ID only, first we filter by "id", //
//then id will be assifned selected id from the dropdown//
function describeID(id) {
d3.json("data/samples.json").then(data => {
  var descriptiveData = data.metadata.filter(eachSample => eachSample.id == id);
  //filters data.medatada.id to pick an id id will be passed later//


//metadata is an array with one object in it (all data are in that object with key values) need to select that one object in that array//
  var resultData=descriptiveData[0];
  console.log(resultData);
//resultData is an object with keys and keyvalues//
//demographic info needs to be shown after id="#sample-metadata"//
  var demoInfo=d3.select("#sample-metadata");
  //.html() used to set html content of the selected element =clears and sets to empty
  demoInfo.html("");
  
   //adding key-value pairs --appending an h6 that can hold key-values//
  Object.entries(resultData).forEach(([key, value]) => {
  demoInfo.append("h6").text(`${key}: ${value}`);
    });
  });
}

function chart(id) {
  d3.json("data/samples.json").then(data =>{
    var dataFiltered=data.samples.filter(eachSample => eachSample.id == id);
    var resultData = dataFiltered[0];
    var otu_ids = resultData.otu_ids;
    var otu_labels = resultData.otu_labels;
    var sample_values = resultData.sample_values;
//create a bar chart, for first ten 
    var yvalues = otu_ids.slice(0, 10).map( x => `OTU_${x}`);
//sample_values are already sorted descending, so selecting the first 10 will provide the top ten//

    var trace1= {
        y: yvalues,
        x: sample_values.slice(0, 10),
        text: otu_labels.slice(0, 10),
        type: "bar",
        orientation: "h"
        };

    var dataBarChart = [trace1];

    var layout={
      title: "First 10 Bacteria"
    };
      
    Plotly.newPlot("bar", dataBarChart, layout);
  
  });
}

function init() {
 
  var selectID = d3.select("#selDataset");
 
  d3.json("data/samples.json").then((data) => {
    var names = data.names;
//names is now the array with the "anmes of ids"
    names.forEach((id) => {
      selectID.append("option")
        .text(id)
        .property("value", id);
    });

    //  initial plots
    var firstname = names[0];//will grab the value=940//
    //creates initial chart for id=940 
    chart(firstname);//
    //fills in data under demographic info for the firsname//
    describeID(firstname);
  });
}
//when the option changes, optionChanged(this.value) will take the value of changed option and feed in to chart(n) function
function optionChanged(n) {
  // Fetch new data each time a new sample is selected
  chart(n);
  describeID(n);
}

// Initialize the dashboard
init();