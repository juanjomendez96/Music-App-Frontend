<template>
    <div id="tabla">
        <el-search-table-pagination
                type="local"
                :data="alldata"
                :page-sizes="[5, 10, 20, 100]"
                :columns="columns"
                :form-options="formOptions"
                @row-click="goto"
                >
        </el-search-table-pagination>
    </div>
</template>

<script>
    export default {
        name:'tabla',
        props:['alldata', 'columnas'],
        data() {
            return {
                formOptions: {
                    inline:true,
                    submitBtnText: 'Search',
                    forms:[
                        { prop: this.getProps(), label:'Name' }
                    ]
                },
                columns: []
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(){
                for(var element of this.columnas){
                    var data = {};
                    data['prop'] = element;
                    data['label'] = element.toUpperCase();
                    data['width'] = 'auto';
                    this.columns.push(data);
                }
            },
            goto(row){
                if(this.$route.name == 'Artists'){
                    this.$router.push(this.$route.path + '/' + row.artistid);
                }else if(this.$route.name == 'Individual Artist'){
                    this.$router.push(this.$route.path + '/albums');
                }else if(this.$route.name == 'Albums of the artist'){
                    this.$router.push(process.env.BASE_URL + 'albums/' + row.albumid);
                }else if(this.$route.name == 'Albums'){
                    this.$router.push(process.env.BASE_URL + 'albums/' + row.albumid);
                }else if(this.$route.name == 'Individual Album'){
                    this.$router.push(process.env.BASE_URL + row.albumid + '/tracks');
                }else if(this.$route.name == 'Tracks'){
                    this.$router.push(process.env.BASE_URL + 'tracks/' + row.trackid);
                }else if(this.$route.name == 'Tracks of the album'){
                    this.$router.push(process.env.BASE_URL + 'tracks/' + row.trackid)
                }
            },
            getProps(){
                if(this.$route.name == 'Artists'){
                    return 'nameArtist';
                }else if(this.$route.name == 'Albums'){
                    return 'nameAlbum';
                }else if(this.$route.name == 'Tracks'){
                    return 'nameTrack';
                }else if(this.$route.name == 'Playlists'){
                    return 'namePlaylist';
                }
            }
        }
    }
</script>
