const ctx = document.getElementById('chart').getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = 500;

const chartConfiguration = {
    type: 'bar',
    data: {
        datasets: [{
            label: '-', // WILL BE UPDATED
            backgroundColor: Chart.helpers.color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            data: [], // WILL BE UPDATED
            type: 'bar',
            pointRadius: 0,
            fill: true,
            lineTension: 0,
            borderWidth: 1,
        }]
    },
    options: {
        events: [''],
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
                }
            }]
        },
        tooltips: {
            intersect: false,
            mode: 'index'
        }
    }
};

const LIMIT = 10;

function limitDatapoints(state) {
    let from = (state.length - LIMIT);
    from = (from < 0) ? 0 : from;
    return state.slice(from);
}

function renderChart(label, state) {
    chartConfiguration.data.datasets[0].label = label;
    chartConfiguration.data.datasets[0].data = state;
    // chartConfiguration.data.datasets[0].data = stateToDisplay(state);
    new Chart(ctx, chartConfiguration);
}

renderChart(window.label, window.records);
