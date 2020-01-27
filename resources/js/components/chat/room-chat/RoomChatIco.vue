<template>
    <div class="ico-container">
        <img :src="this.ico" alt="" id="c-ico" class="chat-icon" width="70" height="70" @click="this.showModal">
    </div>
</template>

<script>
    import Default from "./icons/c-hover.svg";
    import Hover from "./icons/c-default.svg";
    import Unread from "./icons/c-unread-hover.svg";
    import UnreadHover from "./icons/c-unread-default.svg";
    export default {
        props: {
            unread: {
                type: Boolean,
                default: false
            },
            showModal:{}
        },
        watch: {
          unread: {
              handler() {
                  this.changeIco();
              },
              deep: true,
              immediate: true,
          },
        },
        data() {
            return {
                ico: null,
            }
        },
        mounted() {
            let icon = $('#c-ico');
            if(this.hasUnread()){
                this.ico = Unread;
            }else{
                this.ico = Default;
            }
            icon.mouseover(()=>{
                if(this.hasUnread()){
                    this.ico = UnreadHover;
                }else{
                    this.ico = Hover;
                }
            });
            icon.mouseleave(()=>{
                if(this.hasUnread()){
                    this.ico = Unread;
                }else{
                    this.ico = Default;
                }
            });
        },

        methods: {
            hasUnread() {
                return !!this.unread;
            },
            changeIco(){
                if(this.hasUnread()){
                    this.ico = Unread;
                }else{
                    this.ico = Default;
                }
            }
        },
    }
</script>
