<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col">
                <input type="text" class="p-search" placeholder="Введите имя чтобы найти профиль" v-model="inString"
                       :class="{'p-search-searching':this.inString.length>=3}" id="search" autocomplete="off">
                <div class="p-s-pallet container" :class="{'p-s-pallet-shown':this.inString.length>=3}">
                    <loader v-if="loading"/>
                    <div  v-if="dataNotFound" class="row row-result">
                        <div class="col s-result p-2">
                            Совпадений не найдено
                        </div>
                    </div>
                    <div class="row row-result" v-for="user in dataFound">
                        <div class="col s-result p-2" v-text="user.name" @click="showProfile(user)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Loader from "../../utils/Loader";
    export default {
        components:{
            Loader,
        },
        data() {
            return {
                inString: "",
                dataFound: [],
                loading: true,
                dataNotFound: false,
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
                    axios.get('/profile/search/'+this.inString)
                        .then(response=>{
                            this.loading = false;
                            this.nullifyResults();
                            if(response.data === 404){
                                this.dataNotFound = true;
                            }else{
                                this.dataNotFound = false;
                                for(let user in response.data){
                                    this.dataFound.push(response.data[user])
                                }
                            }
                        })
                }
            },
            nullifyResults(){
                this.dataFound = [];
            },
            showProfile(user){
                this.$emit('profile-switch',user);
                this.nullifyResults();
                this.inString = "";
            }
        },
    }
</script>
