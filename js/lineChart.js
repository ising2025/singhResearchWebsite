/*
    Demonstrate how to create a line chart
*/

async function getData(){
    const response = await fetch('../data/mean-flow-speed.csv');
    const data = await response.text();     // CSV is in TEXT format
    //console.log(data);

    const xPH = []; //x-axis labels = pH values
    const yFlowMean = []; //y-axis mean flow values
    const yFlow1 = []; //y-axis trial 1 flow values
    const yFlow2 = []; //y-axis trial 2 flow values
    const yFlow3 = []; //y-axis trial 3 flow values
    const yFlow4 = []; //y-axis trial 4 flow values
    const yFlow5 = []; //y-axis Strial 5 flow values
    const yFlowWithout = []; //y-axis without aluminum flow values

    // \n - new line character
    // split('\n') will separate table into an array of indiv. rows
    // slice(start, end) - return a new array starting at index start
    //      up to but not including index end.
    const table = data.split('\n').slice(1);
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(',');     // split each row on the commas
        const ph = columns[0];            // assign pH value
        xPH.push(ph);                  // push pH value into xPH array
        
        const one = parseFloat(columns[1]);        //assign flow values
        yFlow1.push(one);           //push flow values to store trial 1 flow values

        const two = parseFloat(columns[2]);        //assign flow values
        yFlow2.push(two);           //push flow values to store trial 2 flow values
        
        const three = parseFloat(columns[3]);        //assign flow values
        yFlow3.push(three);           //push flow values to store trial 3 flow values

        const four = parseFloat(columns[4]);        //assign flow values
        yFlow4.push(four);           //push flow values to store trial 4 flow values

        const five = parseFloat(columns[5]);        //assign flow values
        yFlow5.push(five);           //push flow values to store trial 5 flow values

        const mean = parseFloat(columns[6]);        //assign flow values
        yFlowMean.push(mean);           //push flow values to store trial mean flow values

        const without = parseFloat(columns[7]);        //assign flow values
        yFlowWithout.push(without);           //push flow values to store trial without aluminum flow values

        //console.log(year, temp, nhTemp, shTemp);
    });
    return{xPH, yFlow1, yFlow2, yFlow3, yFlow4, yFlow5, yFlowMean, yFlowWithout,}
}

async function createChart(){
    const data = await getData();   // createChart will wait until getData() is finished processing
    const ctx = document.getElementById("myChart");
    const degSym = String.fromCharCode(176);
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xPH,
            datasets: [
                {
                    label: `Flow Speed for Trial 1 in L/m`,
                    data: data.yFlow1,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: `Flow Speed for Trial 2 in L/m`,
                    data: data.yFlow2,
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: `Flow Speed for Trial 3 in L/m`,
                    data: data.yFlow3,
                    fill: false,
                    backgroundColor: 'rgba(0, 153, 51, 0.2)',
                    borderColor: 'rgba(0, 153, 51, 1)',
                    borderWidth: 1
                },
                {
                    label: `Flow Speed for Trial 4 in L/m`,
                    data: data.yFlow4,
                    fill: false,
                    backgroundColor: 'rgba(255, 127, 0, 0.2)',
                    borderColor: 'rgba(255, 127, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: `Flow Speed for Trial 5 in L/m`,
                    data: data.yFlow5,
                    fill: false,
                    backgroundColor: 'rgba(150, 75, 0, 0.2)',
                    borderColor: 'rgba(150, 75, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: `Mean Flow Speed in L/m`,
                    data: data.yFlowMean,
                    fill: false,
                    backgroundColor: 'rgba(127, 0, 255, 0.2)',
                    borderColor: 'rgba(127, 0, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: `Flow Speed for Trial Without Aluminum in L/m`,
                    data: data.yFlowWithout,
                    fill: false,
                    backgroundColor: 'rgba(255, 0, 255, 0.2)',
                    borderColor: 'rgba(255, 0, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,       // Re-size based on screen size
            scales: {                // Display options for x & y axes
                x: {
                    title: {
                        display: true,
                        text: 'pH',       //x-axis title
                        font: {             // font properties
                            size: 20
                        },
                    },
                    ticks: {
                        callback: function(val, index){
                            // Labeling of tick marks can be controlled by code and font size
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font: {
                            size: 16
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Flow Speed (L/m)',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {          // Display options
                title: {
                    display: true,
                    text: 'Water Flow Speed With and Without Aluminum in L/m Based on pH',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();