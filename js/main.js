

// Función para ocultar todos los gráficos y diagramas
function hideAllCharts() {
    const allContainers = document.querySelectorAll('.chart-container, .diagram-container, .verification-sheet');
    allContainers.forEach(container => {
        container.style.display = 'none';
    });
}

// Generar datos aleatorios para las gráficas
function getRandomData(numPoints, maxValue = 100) {
    return Array.from({ length: numPoints }, () => Math.floor(Math.random() * maxValue));
}

// Función para mostrar el gráfico seleccionado
function showSelectedChart(chartId) {
    hideAllCharts();
    const selectedContainer = document.getElementById(`${chartId}Container`);
    if (selectedContainer) {
        selectedContainer.style.display = 'block';
    }
}

// Inicialización del selector
document.getElementById('chartSelector').addEventListener('change', function() {
    const selectedChart = this.value;
    showSelectedChart(selectedChart);
});

// Mostrar el primer gráfico por defecto
showSelectedChart('barChart');

// 1. Gráfica de Barras
const ctxBar = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
            label: 'Ventas',
            //data: [12, 19, 3, 5],
            data: getRandomData(4),
            backgroundColor: ['red', 'blue', 'green', 'yellow']
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

// 2. Gráfica de Pastel
const ctxPie = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['A', 'B', 'C'],
        datasets: [{
            //data: [10, 20, 30],
            data: getRandomData(3),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
        }]
    }
});

// 3. Gráfica de Dispersión
const ctxScatter = document.getElementById('scatterChart').getContext('2d');
const scatterChart = new Chart(ctxScatter, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{x: 10, y: 20}, {x: 20, y: 10}, {x: 30, y: 30}]
        }]
    },
    options: {
        scales: {
            x: { type: 'linear', position: 'bottom' }
        }
    }
});

// 4. Diagrama de Pareto (Gráfica de Barras + Línea)
const ctxPareto = document.getElementById('paretoChart').getContext('2d');
const paretoData = getRandomData(5)//[40, 25, 15, 10, 5];
const total = paretoData.reduce((a, b) => a + b, 0);
const cumulative = paretoData.map((sum => value => sum += value)(0));

const paretoChart = new Chart(ctxPareto, {
    type: 'bar',
    data: {
        labels: ['Problema 1', 'Problema 2', 'Problema 3', 'Problema 4', 'Problema 5'],
        datasets: [{
            label: 'Frecuencia',
            data: paretoData,
            backgroundColor: 'blue'
        }, {
            label: 'Cumulativo (%)',
            data: cumulative.map(val => (val / total) * 100),
            type: 'line',
            borderColor: 'red',
            fill: false,
            yAxisID: 'y1'
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                ticks: {
                    callback: (value) => value + '%'
                }
            }
        }
    }
});

// 5. Gráfica de Control
const ctxControl = document.getElementById('controlChart').getContext('2d');
const controlChart = new Chart(ctxControl, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
            label: 'Valores',
            //data: [3, 7, 4, 6, 8, 5, 9],
            data: getRandomData(7),
            borderColor: 'green',
            fill: false
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

// 6. Histograma
const ctxHistogram = document.getElementById('histogramChart').getContext('2d');
const histogramData = getRandomData(9)//[1, 2, 2, 3, 3, 3, 4, 4, 5];
const histogramChart = new Chart(ctxHistogram, {
    type: 'bar',
    data: {
        labels: [...new Set(histogramData)], // Unique values
        datasets: [{
            label: 'Frecuencia',
            data: histogramData.reduce((acc, curr) => {
                acc[curr] = (acc[curr] || 0) + 1;
                return acc;
            }, []),
            backgroundColor: 'purple'
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

// 7. Diagrama de Espina de Pescado (Manual)
const fishboneDiagram = document.getElementById('fishboneDiagram');
let rambom = Math.floor(Math.random() * 4);
let img = ["./img/pescado1.png", "./img/pescado2.png", "./img/pescado3.png"];
fishboneDiagram.innerHTML = `
    <img width="700" height="500" src="${img[rambom]}" alt="Diagramas de Pescado">
    
`;

// 8. Hoja de Verificación
const verificationTable = document.getElementById('verificationTable');
const verificationData = ['Limpieza en los tanques', 'Limpio la meza de trabajo', 'Ordenado los anaqueles', 'Guntar todas las basura'];
verificationData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${item}</td><td><input type="checkbox"></td>`;
    verificationTable.appendChild(row);
});
