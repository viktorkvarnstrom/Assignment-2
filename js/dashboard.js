(function ($) {
  'use strict';
  $(function () {
    if ($('#fullName-welcomeText').length) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);

          let fullName = object.firstname + " " + object.lastname;
          $('#fullName-welcomeText').text(`hi, ${fullName}`);

        }
      }
      request.open('GET', 'https://fe18.azurewebsites.net/api/user'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();
    }


    if ($('#totalSalesAmount').length) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);

          let salesAmount = object.amount + " " + object.currency;
          $('#totalSalesAmount').text(`${salesAmount}`);
          $('#totalSalesAmountSmall').text(`${object.period}`);

        }
      }
      request.open('GET', 'https://fe18.azurewebsites.net/api/totalsales'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();
    }

    if ($('#totalPurchaesAmount').length) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);

          let purchaesAmount = object.amount + " " + object.currency;
          $('#totalPurchaesAmount').text(`${purchaesAmount}`);
          $('#totalPurchaesAmountSmall').text(`${object.period}`);
        }
      }
      request.open('GET', 'https://fe18.azurewebsites.net/api/totalpurchases'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();
    }

    if ($('#totalOrdersAmount').length) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);

          let totalOrders = object.amount + " " + object.currency;
          $('#totalOrdersAmount').text(`${totalOrders}`);
          $('#totalOrdersAmountSmall').text(`${object.period}`);
        }
      }
      request.open('GET', 'https://fe18.azurewebsites.net/api/totalorders'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();
    }

    if ($('#totalGrowthAmount').length) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);

          let totalGrowth = object.amount + " " + object.currency;
          $('#totalGrowthAmount').text(`${totalGrowth}`);
          $('#totalGrowthAmountSmall').text(`${object.period}`);
        }
      }
      request.open('GET', 'https://fe18.azurewebsites.net/api/totalgrowth'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();
    }




    if ($("#total-sales-chart").length) {
      let request = new XMLHttpRequest();
      request.onload = function () { // laddar upp information
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);

          var areaData = {
            labels: object.labels,
            datasets: [
              {
                data: object.datasets[0].data,
                backgroundColor: [
                  'rgba(61, 165, 244, .0)'
                ],
                borderColor: [
                  'rgb(61, 165, 244)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: object.datasets[0].label,
              },
              {
                data: object.datasets[1].data,
                backgroundColor: [
                  'rgba(241, 83, 110, .0)'
                ],
                borderColor: [
                  'rgb(241, 83, 110)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: object.datasets[1].label,
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  display: true,
                  padding: 20,
                  fontColor: "#000",
                  fontSize: 14
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: true,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  fontColor: "#000",
                  fontSize: 14,
                  padding: 18,
                  stepSize: 100000,
                  callback: function (value) {
                    var ranges = [
                      { divider: 1e6, suffix: 'M' },
                      { divider: 1e3, suffix: 'k' }
                    ];
                    function formatNumber(n) {
                      for (var i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                          return (n / ranges[i].divider).toString() + ranges[i].suffix;
                        }
                      }
                      return n;
                    }
                    return formatNumber(value);
                  }
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .37
              },
              point: {
                radius: 0
              }
            }
          }
          var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
          var revenueChart = new Chart(revenueChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      };

      request.open('GET', 'https://fe18.azurewebsites.net/api/totalsaleschart'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();
    }
    if ($("#users-chart").length) {                                                             //Userchart begins
      let request = new XMLHttpRequest();
      request.onload = function () { // laddar upp information
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);
          var areaData = {
            labels: object.labels,
            datasets: [{
              data: object.datasets[0].data,
              backgroundColor: [
                '#e0fff4'
              ],
              borderWidth: 2,
              borderColor: "#00c689",
              fill: 'origin',
              label: object.datasets[0].label
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .35
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });

        }
      };

      request.open('GET', 'https://fe18.azurewebsites.net/api/userschart'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();
    }                                                                            // UserChart ends

    if ($("#projects-chart").length) {
      let request = new XMLHttpRequest();
      request.onload = function () { // laddar upp information
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);
          var areaData = {
            labels: object.labels,
            datasets: [{
              data: object.datasets[0].data,
              backgroundColor: [
                '#e5f2ff'
              ],
              borderWidth: 2,
              borderColor: "#3da5f4",
              fill: 'origin',
              label: object.datasets[0].label
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .05
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      };

      request.open('GET', 'https://fe18.azurewebsites.net/api/projectschart'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();

    }

    if ($('#offlineProgress').length) {
      var bar = new ProgressBar.Circle(offlineProgress, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: true,
          style: {
            color: "#fff",
            position: 'absolute',
            left: '40%',
            top: '50%'
          }
        },
        svgStyle: {
          width: '90%'
        },
        from: {
          color: '#f1536e',
          width: 6
        },
        to: {
          color: '#f1536e',
          width: 6
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }

        }
      });

      bar.text.style.fontSize = '1rem';
      bar.animate(.64); // Number from 0.0 to 1.0
    }

    if ($('#onlineProgress').length) {
      var bar = new ProgressBar.Circle(onlineProgress, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: true,
          style: {
            color: "#fff",
            position: 'absolute',
            left: '40%',
            top: '50%'
          }
        },
        svgStyle: {
          width: '90%'
        },
        from: {
          color: '#fda006',
          width: 6
        },
        to: {
          color: '#fda006',
          width: 6
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }

        }
      });

      bar.text.style.fontSize = '1rem';
      bar.animate(.84); // Number from 0.0 to 1.0
    }

    if ($("#revenue-chart").length) {
      var CurrentChartCanvas = $("#revenue-chart").get(0).getContext("2d");
      var CurrentChart = new Chart(CurrentChartCanvas, {
        type: 'bar',
        data: {
          labels: ["1982", "", "1993", "", "2003", "", "2013"],
          datasets: [{
            label: 'Europe',
            data: [280000, 90000, 150000, 200000, 50000, 150000, 260000, 150000, 260000],
            backgroundColor: '#405189'
          },
          {
            label: 'Africa',
            data: [250000, 230000, 130000, 160000, 110000, 230000, 50000, 230000, 50000],
            backgroundColor: '#3da5f4'
          }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                drawBorder: false
              },
              ticks: {
                fontColor: "#000",
                display: true,
                fontStyle: 400,
                fontSize: 14,
                stepSize: 100000,
                callback: function (value) {
                  var ranges = [
                    { divider: 1e6, suffix: 'M' },
                    { divider: 1e3, suffix: 'k' }
                  ];
                  function formatNumber(n) {
                    for (var i = 0; i < ranges.length; i++) {
                      if (n >= ranges[i].divider) {
                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                      }
                    }
                    return n;
                  }
                  return formatNumber(value);
                }
              }
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: .5,
              barPercentage: 1,
              ticks: {
                beginAtZero: true,
                fontColor: "#000",
                display: true,
                fontSize: 14
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              },
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }
      });
    }

    if ($("#distribution-chart").length) {
      let request = new XMLHttpRequest();
      request.onload = function () { // laddar upp information
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);

          var areaData = {
            labels: object.labels,
            datasets: [{
              data: object.datasets[0].data,
              backgroundColor: [
                "#3da5f4", "#f1536e", "#fda006"
              ],
              borderColor: "rgba(0,0,0,0)"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 72,
            elements: {
              arc: {
                borderWidth: 4
              }
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            legendCallback: function (chart) {
              var text = [];
              text.push('<div class="distribution-chart">');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
              text.push('<p>Texas</p>');
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
              text.push('<p>Utah</p>');
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
              text.push('<p>Georgia</p>');
              text.push('</div>');
              text.push('</div>');
              return text.join("");
            },
          }
          var distributionChartPlugins = {
            beforeDraw: function (chart) {
              var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

              ctx.restore();
              var fontSize = .96;
              ctx.font = "600 " + fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";

              var text = "70%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }
          var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
          var distributionChart = new Chart(distributionChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: distributionChartPlugins
          });
          document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();

        }
      };

      request.open('GET', 'https://fe18.azurewebsites.net/api/distributionchart'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();
    }

    if ($("#sale-report-chart").length) {
      let request = new XMLHttpRequest();
      request.onload = function () { // laddar upp information
        if (this.readyState == 4 && this.status == 200) {
          let object = JSON.parse(this.response);


          var CurrentChartCanvas = $("#sale-report-chart").get(0).getContext("2d");
          var CurrentChart = new Chart(CurrentChartCanvas, {
            type: 'bar',
            data: {
              labels: object.labels,
              datasets: [{
                label: object.datasets[0].label,  
                data: object.datasets[0].data,
                backgroundColor: ["#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4"]
              }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                yAxes: [{
                  display: true,
                  gridLines: {
                    drawBorder: false
                  },
                  ticks: {
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14,
                    stepSize: 10000,
                    callback: function (value) {
                      var ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                          }
                        }
                        return n;
                      }
                      return "$" + formatNumber(value);
                    }
                  }
                }],
                xAxes: [{
                  stacked: false,
                  categoryPercentage: .6,
                  ticks: {
                    beginAtZero: true,
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: true
                  },
                  barPercentage: .7
                }]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
        }
      };

      request.open('GET', 'https://fe18.azurewebsites.net/api/salereportchart'); // Hämtar JavaScirpts objektet och sparar in det i request.   
      request.send();

    }

  });
})(jQuery);