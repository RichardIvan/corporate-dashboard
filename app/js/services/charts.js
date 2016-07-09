/* @flow */
'use strict'

export function generateChart(state, chartData) {
  return {
    "type": "serial",
        "theme": "none",
        // "pathToImages": "/lib/3/images/",
        "dataProvider": chartData,
        "graphs": [
          // {
          //   "balloonText": "[[title]]: [[value]]",
          //   "lineThickness": 1,
          //   "title": "Date",
          //   "valueField": "date"
          // },
          {
            "balloonText": "[[title]]: [[value]]",
              "columnWidth": 0.65,
              "fillAlphas": 1,
              "title": "#Of Paying Customers",
              "type": "column",
              "valueField": "total"
          }
        ],
        "zoomOutButtonRollOverAlpha": 0.15,
        "chartCursor":
          {
            "categoryBalloonDateFormat": "DD MM YY",
            "cursorPosition": "mouse",
            "showNextAvailable": true
          },
        "columnWidth": 1,
        "categoryField": "date",
        "categoryAxis": {
          "minPeriod": "dd",
              "parseDates": false
        },
    //     "exportConfig": {
    //     "menuTop": "20px",
    //         "menuRight": "20px",
    //         "menuItems": [{
    //         "icon": '/lib/3/images/export.png',
    //             "format": 'png'
    //     }]
    // },
    legend: {}
  }
}
