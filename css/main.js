// Mostrar u ocultar el gráfico dependiendo de la selección
document.getElementById('chartType').addEventListener('change', function() {
    const selectedChart = this.value;
    const containers = document.querySelectorAll('.diagram-container');
  
    // Ocultar todos los contenedores de gráficos
    containers.forEach(container => container.style.display = 'none');
  
    // Mostrar el gráfico seleccionado
    if (selectedChart) {
      document.getElementById(`${selectedChart}Container`).style.display = 'block';
      generateRandomData(selectedChart);
    }
  });
  
  // Generar datos aleatorios para las gráficas
  function getRandomData(numPoints, maxValue = 10) {
    return Array.from({ length: numPoints }, () => Math.floor(Math.random() * maxValue));
  }
  
  // Función para generar y mostrar el gráfico con datos aleatorios
  function generateRandomData(chartType) {
    if (chartType === 'bar') {
      const barCtx = document.getElementById('barChart').getContext('2d');
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['A', 'B', 'C', 'D', 'E'],
          datasets: [{
            label: 'Valores',
            data: getRandomData(5),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });
    } else if (chartType === 'pie') {
      const pieCtx = document.getElementById('pieChart').getContext('2d');
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['A', 'B', 'C'],
          datasets: [{
            data: getRandomData(3),
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            borderColor: 'rgba(255, 255, 255, 1)',
          }]
        }
      });
    } else if (chartType === 'scatter') {
      const scatterCtx = document.getElementById('scatterChart').getContext('2d');
      new Chart(scatterCtx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Datos de Dispersión',
            data: getRandomData(10).map(x => ({x, y: Math.floor(Math.random() * 10)})),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          }]
        },
        options: {
          scales: {
            x: { type: 'linear', position: 'bottom' }
          }
        }
      });
    } else if (chartType === 'pareto') {
      const paretoCtx = document.getElementById('paretoChart').getContext('2d');
      new Chart(paretoCtx, {
        type: 'bar',
        data: {
          labels: ['A', 'B', 'C'],
          datasets: [{
            label: 'Frecuencia',
            data: getRandomData(3),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            yAxisID: 'y',
          }, {
            label: 'Porcentaje acumulado',
            data: [50, 80, 100],
            type: 'line',
            borderColor: 'rgba(54, 162, 235, 1)',
            yAxisID: 'y1',
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true, position: 'left' },
            y1: { beginAtZero: true, position: 'right' }
          }
        }
      });
    }
    // Otras gráficas como la de control e histograma pueden seguir la misma lógica con datos aleatorios
  }
  