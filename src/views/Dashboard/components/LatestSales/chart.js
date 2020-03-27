import palette from 'gatsby-theme-material-ui-top-layout/palette'

const available = [341, 25, 328, 29, 257, 10, 86, 6]
const required = [300, 75, 300, 75, 90, 15, 50, 10]
let barFillColor = []

for (let i = 0; i < available.length; i++) {
  if (available[i] < required[i]) {
    barFillColor[i] = palette.error.main
  }
  else {
    barFillColor[i] = palette.success.main
  }
}

export const data = {
  labels: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
  datasets: [
    {
      label: 'Available',
      backgroundColor: [...barFillColor],
      data: [...available],
      barThickness: 12,
      maxBarThickness: 10,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    // {
    //   label: 'Desired',
    //   data: [11, 20, 12, 29, 30, 25, 13]
    // }
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};
