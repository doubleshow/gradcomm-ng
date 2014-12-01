'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
    .controller('ReportCtrl', function($scope, $http, $filter) {

        var orderBy = $filter('orderBy')


        $http.get('data/data.json').success(function(data) {

            $scope.students = data

            var rows = []
            data.forEach(function(x) {
                // x.name = x.info.name
                // x.advisor = x.phd.advisor

                var row = x.info.name + ", " + x.phd.advisor + ", "
                rows.push(row)


                var years = ['2008','2009','2010','2011','2012','2013','2014','2015']
                $scope.years = years
                var timeline = {}
                years.forEach(function (y){
                    timeline[y] = ''
                })
                x.timeline = timeline


                x.phd.milestones_completed = []

                function get_style(name){
                    if (name === 'Area Exam'){
                        return 'btn-info'
                    } else if (name === 'Proposal Defense'){
                        return 'btn-success'
                    } else if (name === 'Dissertation Defense'){
                        return 'btn-danger'
                    }else{
                        return 'btn-default'
                    }
                }

                if (x.phd.milestones) {

                    x.phd.milestones.forEach(function(m) {
                        if (m.completed.length > 2) {
                            x.phd.milestones_completed.push(m.name)

                            years.forEach(function (y){
                                if (m.completed.search(y) > 0){
                                    timeline[y] = {name: m.name, klass: get_style(m.name)}
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