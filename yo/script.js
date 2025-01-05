// Paramètres initiaux
let currentYield = 0.03; // 3% de taux actuariel
const maxMaturity = 30;  // on va simuler de 1 à 30 ans
const faceValue = 100;   // valeur nominale de l'obligation

// Sélecteurs DOM
const minusRateBtn = document.getElementById('minusRate');
const plusRateBtn = document.getElementById('plusRate');
const currentRateDisplay = document.getElementById('currentRate');
const bondChartCanvas = document.getElementById('bondChart');

// Fonction pour formater le taux en pourcentage
function formatRate(rate) {
  return (rate * 100).toFixed(2) + ' %';
}

// Fonction pour calculer la liste de prix de l'obligation
function getBondPrices(yieldValue) {
  const prices = [];
  for (let t = 1; t <= maxMaturity; t++) {
    // Prix d'une obligation zéro-coupon
    const price = faceValue / Math.pow(1 + yieldValue, t);
    prices.push(price.toFixed(2));
  }
  return prices;
}

// Configuration initiale du graphique avec Chart.js
const chartConfig = {
  type: 'line',
  data: {
    labels: Array.from({ length: maxMaturity }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Prix de l’obligation',
        data: getBondPrices(currentYield),
        fill: false,
        borderColor: '#4caf50',
        backgroundColor: '#4caf50',
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Maturité (années)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Prix (€)'
        }
      }
    }
  }
};

// Création du graphique
let bondChart = new Chart(bondChartCanvas, chartConfig);

// Mise à jour du texte du taux
currentRateDisplay.textContent = formatRate(currentYield);

// Écouteurs d'événements pour modifier le taux
minusRateBtn.addEventListener('click', () => {
  currentYield -= 0.01; // on réduit de 1 point de base (1%)
  if (currentYield < 0) {
    currentYield = 0;   // on empêche d'aller en taux négatif
  }
  updateChart();
});

plusRateBtn.addEventListener('click', () => {
  currentYield += 0.01; // on augmente de 1 point de base (1%)
  updateChart();
});

// Fonction pour mettre à jour le graphique et le taux affiché
function updateChart() {
  bondChart.data.datasets[0].data = getBondPrices(currentYield);
  bondChart.update();
  currentRateDisplay.textContent = formatRate(currentYield);
}