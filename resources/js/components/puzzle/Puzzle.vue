<template>
    <div>
        <canvas id="canvas-puzzle" width="1490" height="820"></canvas>
<!--            <div id="right-menu">-->
<!--                <div id="right-menu-top">-->
<!--                    <div id="header">-->
<!--                        Игроки в комнате-->
<!--                    </div>-->
<!--                    <div id="people-list">-->
<!--                        <ul>-->
<!--                            <li v-for="person of people">-->
<!--                                <div class="person">-->
<!--                                    <div id="person-image"-->
<!--                                         v-bind:style="{backgroundImage: 'url(' + person.img + ')'}"></div>-->
<!--                                    <div id="person-right">-->
<!--                                        <div id="person-top">-->
<!--                                            {{ person.name }}-->
<!--                                        </div>-->
<!--                                        <div id="person-bottom">-->
<!--                                            {{ person.description }}-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div id="color-sign" v-bind:style="{backgroundColor: person.color}"></div>-->
<!--                                </div>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div id="right-menu-bottom">-->
<!--                    <div id="control-panel">-->
<!--                        <div class="button-place">-->
<!--                            <div id="button-exit"></div>-->
<!--                        </div>-->
<!--                        <div id="timer">17:40</div>-->
<!--                        <div class="button-place">-->
<!--                            <div id="button-play"></div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div id="achiev-list">-->
<!--                        <ul>-->
<!--                            <li v-for="achiev of achievements">-->
<!--                                <div class="achiev">-->
<!--                                    <div id="achiev-image"-->
<!--                                         v-bind:style="{backgroundImage: 'url(' + achiev.img + ')'}"></div>-->

<!--                                    <div id="achiev-right">-->
<!--                                        <div id="achiev-top">-->
<!--                                            {{ achiev.name }}-->
<!--                                        </div>-->
<!--                                        <div id="achiev-bottom">-->
<!--                                            {{ achiev.description }}-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="color-sign" v-bind:style="{backgroundColor: achiev.color}"></div>-->
<!--                                </div>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
    </div>

</template>

<script>
    export default {
        name: "Puzzle",
        mounted() {
            this.loadScripts();
        },
        methods: {
            loadScripts() {
                this.appendStyle("/js/PuzzleCanvas/dist/puzzle.css");
                this.appendScipt("/js/PuzzleCanvas/dist/puzzle.js");
            },
            appendScipt(path){
                let script = document.createElement('script');
                script.setAttribute('src', path);
                script.setAttribute('type', 'module');
                document.head.appendChild(script);
            },
            appendStyle(path){
                let style = document.createElement('style');
                style.setAttribute('href', path);
                document.head.appendChild(style);
            }
        },
    }
</script>

