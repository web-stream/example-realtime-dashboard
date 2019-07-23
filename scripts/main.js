const ctx = document.getElementById('chart').getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = 300;

const parsedData = window.data.map(({ time, heap }) => {
    return { t: time, y: heap };
});

const chartConfiguration = {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Memory Usage',
            backgroundColor: Chart.helpers.color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            data: parsedData,
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'series',
                ticks: {
                    source: 'data',
                    autoSkip: true
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Heap'
                }
            }]
        },
        tooltips: {
            intersect: false,
            mode: 'index',
            callbacks: {
                label: function (tooltipItem, myData) {
                    let label = myData.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += `${(tooltipItem.value / 1024 / 1024).toFixed(4)}MB`;
                    return label;
                }
            }
        }
    }
};

const chart = new Chart(ctx, chartConfiguration);
