// Data from: https://data.giss.nasa.gov/gistemp/
// Mean from: https://earthobservatory.nasa.gov/world-of-change/global-temperatures

// module 01 part 03 -- graphing csv data using chart.js library
// https://www.chartjs.org/docs/latest/
// $ npm install chart.js
//boiler plate code for chart.js
const xlabel = [];
const ytemps = [];

chartIt();

async function chartIt() {
    await tempData();
    const ctx = document.getElementById('chart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabel,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in ℃',
                data: ytemps,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // fetch tempData from the csv 

    async function tempData() {
        const response = await fetch("../resource/data/tempData.csv");
        const data = await response.text();

        // manually parsing data using JavaScript .split()
        const table = data.split(/\n/).slice(1);
        table.forEach(elt => {
            const column = elt.split(',');
            const year = column[0];
            xlabel.push(year);
            const temp = column[1];
            ytemps.push(parseFloat(temp) + 14); // typeCasting to float from 'string'
        }); // forEach loop



    }
};