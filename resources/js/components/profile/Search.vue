<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col">
                <input type="text" class="p-search" placeholder="Введите имя чтобы найти профиль" v-model="inString"
                       :class="{'p-search-searching':this.inString.length>=3}" id="search" autocomplete="off">
                <div class="p-s-pallet container" :class="{'p-s-pallet-shown':this.inString.length>=3}">
                    <loader v-if="loading"/>
                    <div class="row row-result" v-for="result in dataFound">
                        <div class="col s-result p-2" v-text="result.text">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Loader from "../utils/Loader";
    export default {
        components:{
            Loader,
        },
        data() {
            return {
                inString: "",
                dataFound: [],
                loading: true
            }
        },
        mounted() {
            $('#search').on('keyup',()=>{
                this.search();
            })
        },
        methods: {
            search() {
                this.nullifyResults();
                if(this.inString.length>=3){
                    this.loading= true;
                    axios.get('/profile/'+this.inString)
                        .then(response=>{
                            this.loading = false;
                            this.nullifyResults();
                            if(response.data === 404){
                                this.dataFound.push({text:'Совпадений не найдено'});
                            }else{
                                for(let prop in response.data){
                                    this.dataFound.push({text:response.data[prop]});
                                }
                            }
                        })
                }
            },
            nullifyResults(){
                this.dataFound = [];
            }
        },
    }
</script>
