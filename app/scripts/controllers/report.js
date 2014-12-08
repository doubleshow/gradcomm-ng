'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
    .controller('StatsCtrl', function($scope, $http) {

        $http.get('data/data.json').success(function(data) {

            $scope.students = data




            var linspace = function linspace(a, b, n) {
                if (typeof n === "undefined") n = Math.max(Math.round(b - a) + 1, 1);
                if (n < 2) {
                    return n === 1 ? [a] : [];
                }
                var i, ret = Array(n);
                n--;
                for (i = n; i >= 0; i--) {
                    ret[i] = (i * b + (n - i) * a) / n;
                }
                return ret;
            }

            function chart_pubs() {


                var pubs = data.map(function(x) {
                    return x.publications.length;
                });

                var total = pubs.reduce(function(a, b) {
                    return a + b;
                }, 0);

                console.log(total)

                var x = linspace(0, 24, 25),
                    y = pubs,
                    num;

                var hist = histogram({
                    data: y,
                    bins: x
                });

                // for (var i = 0; i < hist.length; i++) {
                //     console.log('[' + hist[i].x + ',' + hist[i].y + '],')
                // }

                var config = {
                    title: 'Publications', // chart title
                    tooltips: true,
                    labels: false, // labels on data points
                    // exposed events
                    mouseover: function() {},
                    mouseout: function() {},
                    click: function() {},
                    // legend config
                    legend: {
                        display: false, // can be either 'left' or 'right'.
                        position: 'left',
                        // you can have html in series name
                        htmlEnabled: false
                    },
                    // override this array if you're not happy with default colors
                    colors: [],
                    innerRadius: 0, // Only on pie Charts
                    lineLegend: 'lineEnd', // Only on line Charts
                    lineCurveType: 'cardinal', // change this as per d3 guidelines to avoid smoothline
                    isAnimate: true, // run animations while rendering chart
                    yAxisTickFormat: 's', //refer tickFormats in d3 to edit this value
                    xAxisMaxTicks: 7 // Optional: maximum number of X axis ticks to show if data points exceed this number
                };

                console.log(hist.map(function(p) {
                    return {
                        x: p.x,
                        y: p.y
                    }
                }))

                var acData = {
                    series: ["Publications"],
                    data: hist.map(function(p) {
                        return {
                            x: p.x,
                            y: [p.y],
                            tooltip: '' + p.y + ' students have ' + p.x + ' publications'
                        }
                    })
                    //     x: hist.map(function(p){return p.x;}),
                    //     y: hist.map(function(p){return p.y;}),
                    //     tooltip: "This is a tooltip"
                    // }]
                };

                return {
                    config: config,
                    data: acData,
                    total: total,
                    num_students: pubs.length
                };
            }


            $scope.stats = {};
            $scope.stats.pubs = chart_pubs();

        })
    })
    .controller('ReportCtrl', function($scope, $http, $filter) {

        var orderBy = $filter('orderBy')


        $http.get('data/data.json').success(function(data) {

            $scope.students = data


            // compute timelines

            var rows = []
            data.forEach(function(x) {
                // x.name = x.info.name
                // x.advisor = x.phd.advisor

                var row = x.info.name + ", " + x.phd.advisor + ", "
                rows.push(row)


                var years = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015']
                $scope.years = years
                var timeline = {}
                years.forEach(function(y) {
                    timeline[y] = ''
                })
                x.timeline = timeline


                x.phd.milestones_completed = []

                function get_style(name) {
                    if (name === 'Area Exam') {
                        return 'btn-info'
                    } else if (name === 'Proposal Defense') {
                        return 'btn-success'
                    } else if (name === 'Dissertation Defense') {
                        return 'btn-danger'
                    } else {
                        return 'btn-default'
                    }
                }

                if (x.phd.milestones) {

                    x.phd.milestones.forEach(function(m) {
                        if (m.completed.length > 2) {
                            x.phd.milestones_completed.push(m.name)

                            years.forEach(function(y) {
                                if (m.completed.search(y) > 0) {
                                    timeline[y] = {
                                        name: m.name,
                                        klass: get_style(m.name)
                                    }
                                }
                            })
                            x.timeline = timeline



                            // if (m.completed.search('2009') > 0){
                            //     timeline['2009'] = m.name
                            // }

                        }





                    })

                }

            })


            var str = ''
            rows.forEach(function(row) {
                str = str + row + '\n'
            })

            $scope.csv = str

        });

    });