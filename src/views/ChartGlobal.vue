<template>
    <div id="charts">
        <highcharts :options="rellenardatos"
                    v-if="loading === false && token !== 'null'"
        ></highcharts>
        <el-button type="primary" plain @click="changeChart()" v-if="loading === false && token !== 'null'">Change chart</el-button>
        <p v-loading="loading"
           v-else-if="loading === true && token !== 'null'"
           element-loading-text="Loading..."
           element-loading-spinner="el-icon-loading"
        ></p>
        <el-alert
                title="Please, log in first to see data"
                type="error"
                center
                show-icon
                v-else
        >
        </el-alert>


    </div>
</template>

<script>
    import axios from 'axios';

    import {Chart} from 'highcharts-vue';

    export default {
        name: 'chart',
        data() {
            return{
                token: localStorage.getItem('token'),
                datos: [],
                prices: [],
                countries: [],
                cities: [],
                loading: true,
                typeChart: 'column'
            }
        },
        created: function () {
            this.fetchData();
        },
        computed:{
            //**************************************************************
            // Fills chart with data
            rellenardatos(){

                if(this.loading === false){
                    var unique_cities= [];
                    new Set(this.cities).forEach(element => {
                        unique_cities.push(element);
                    });

                    var unique_countries= [];
                    new Set(this.countries).forEach(element => {
                        unique_countries.push(element);
                    });

                    var series = this.prepareSeries();
                    var drilldowns = this.prepareDrilldowns();


                    var charOptions = {
                        title: {
                            text:'Money spent by country'
                        },
                        series: [{
                            name: 'Number of citites',
                            data: series,
                            colorByPoint: true,

                        }],
                        drilldown: {
                            series: drilldowns
                        },
                        chart:{
                            type: this.typeChart,
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {

                        },
                        legend: {
                            enabled: false
                        },

                    };
                    return charOptions;
                }
                return null;
            }
        },
        methods: {
            changeChart(){
                if(this.typeChart === 'column'){
                    this.typeChart = 'pie';
                }else{
                    this.typeChart = 'column';
                }
            },
            fetchData(){
                axios.get('http://localhost:8000/api/invoice', {
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response =>{
                    this.datos.push(response.data);
                    this.datos[0].forEach(element =>{
                        this.prices.push(parseFloat(element.total));
                        this.countries.push(element.billingcountry);
                        this.cities.push(element.billingcity);

                        this.loading = false;
                    });
                })
            },
            prepareSeries: function () {
                var unique_countries= [];
                new Set(this.countries).forEach(element => {
                    unique_countries.push(element);
                });
                var grouped = [];
                unique_countries.forEach(country =>{
                    grouped.push({
                        name: country,
                        y: this.getNumberOfCities(this.getIndex(this.countries, country)),
                        pointWidth: 40,
                        drilldown: country.toLowerCase(),
                        dataLabels: {
                            enabled: false
                        }
                    })
                });

                return grouped;
            },
            getNumberOfCities(index_cities){
                var number_cities = [];

                index_cities.forEach(element => {
                    if (number_cities.indexOf(this.cities[element]) === -1){
                        number_cities.push(this.cities[element]);
                    }
                });
                return number_cities.length
            },
            prepareDrilldowns: function(){
                var unique_countries= [];
                new Set(this.countries).forEach(element => {
                    unique_countries.push(element);
                });
                var grouped = [];
                unique_countries.forEach(country =>{
                    grouped.push({
                        name: country,
                        id: country.toLowerCase(),
                        data: this.getData(this.getIndex(this.countries, country)),
                    })
                });
                return grouped;
            },
            getData(index_cities){
                var index_price_city = [];
                var existing_cities = [];
                index_cities.forEach(element => {
                    if (existing_cities.indexOf(this.cities[element]) === -1){
                        existing_cities.push(this.cities[element]);
                        index_price_city.push([this.cities[element], this.getPrice(this.getIndex(this.cities, this.cities[element]))]);
                    }else{
                        index_price_city[existing_cities.indexOf(this.cities[element])][1] += this.getPrice(this.getIndex(this.cities, this.cities[element]));
                    }
                });
                return index_price_city;
            },
            getPrice(index){
                var final_price = 0.0;
                index.forEach(ele => {
                    final_price = this.prices[ele];
                });

                return final_price;
            },
            getIndex(arr, val){
                var indexes = [];

                var idx = arr.indexOf(val);
                while (idx !== -1) {
                    indexes.push(idx);
                    idx = arr.indexOf(val, idx + 1);
                }
                return indexes;
            }
        },
        components: {
            highcharts: Chart
        }
    }
</script>