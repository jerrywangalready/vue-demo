<template>
    <div>
        <div id="container">
            <div class="col1">
                <div v-for="item in list1" :id="item.nodeId" name="cell">{{item.name}}</div>
            </div>
            <div class="col2">
                <div v-for="item in list2" :id="item.nodeId" name="cell">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                jsPlumb: null,
                list1:[{name:'XX',nodeId:'x'},{name:'YY',nodeId:'y'},{name:'ZZ',nodeId:'z'}],
                list2:[{name:'AA',nodeId:'a'},{name:'BB',nodeId:'b'},{name:'CC',nodeId:'c'}],
                connlist:[{sourceNodeId:'x',targetNodeId:'a'},{sourceNodeId:'y',targetNodeId:'b'},{sourceNodeId:'z',targetNodeId:'c'}]
            }
        },
        created(){
            this.jsPlumb = this.$jsPlumb.getInstance({
                Container:"container",   //选择器id
                EndpointStyle: { radius: 4, fill: "#acd"},  //端点样式
                PaintStyle: { stroke: '#fafafa',strokeWidth:4},// 绘画样式，默认8px线宽  #456
                HoverPaintStyle: { stroke: '#1E90FF' }, // 默认悬停样式  默认为null
                EndpointHoverStyle: { fill: '#F00', radius:6 }, // 端点悬停样式
                ConnectionOverlays:[
                    ["Arrow",{
                        location:1,
                        paintStyle: {
                            stroke: '#00688B',
                            fill: '#00688B',
                        }
                    }]
                ],
                Connector:["Straight",{gap:1}],     //要使用的默认连接器的类型：折线，流程等
                DrapOptions:{cursor:"crosshair",zIndex:2000}
            });
        },
        mounted() {
            let ins = this.jsPlumb,
                allConnection = ins.getAllConnections();
            ins.batch(() => {
                this.initAll();
                this.connectionAll();
            });
            this.switchContainer(true,true,false);
        },
        methods:{
            initAll () {
                let rl = this.list1;
                for (let i = 0; i < rl.length; i++) {
                    this.init(rl[i].nodeId)
                }
                let rl2 = this.list2;
                for (let i = 0; i < rl2.length; i++) {
                    this.init(rl2[i].nodeId)
                }
            },
            // 初始化规则使其可以连线、拖拽
            init (id) {
                let ins = this.jsPlumb,
                    elem = document.getElementById(id);
                ins.makeSource(elem,{
                    anchor: ["Perimeter", {anchorCount:200, shape:"Rectangle"}],
                    allowLoopback: false,
                    maxConnections: 1
                });
                ins.makeTarget(elem,{
                    anchor: ["Perimeter", {anchorCount:200, shape:"Rectangle"}],
                    allowLoopback: false,
                    maxConnections: 1
                });
                ins.draggable(elem,{
                    containment: true
                });
            },
            connectionAll () {
                let ins = this.jsPlumb;
                ins.ready(() => {
                    for (let i = 0; i < this.connlist.length; i++) {
                        let conn = this.connlist[i],
                            connection = ins.connect({
                                source:conn.sourceNodeId,
                                target:conn.targetNodeId
                            });
                        connection.setPaintStyle({stroke:"#fafafa",strokeWidth:4})
                    }
                })
            },
            switchContainer (target,source,draggable) {
                let elem = document.getElementsByName("cell"),
                    ins = this.jsPlumb;
                ins.setSourceEnabled(elem,source);
                ins.setTargetEnabled(elem,target);
                ins.setDraggable(elem,draggable);
            },
        }
    }
</script>
<style scoped>
    #container{
        margin: 50px;
        position: relative;
        background: #efefef;
        width: 400px;
        height: 400px;
    }
    .col2,.col1{
        float: left;
    }
    .col1{
        margin-left: 40px;
    }
    .col2{
        margin-left: 150px;
    }
    #container>div>div{
        width: 100px;
        height: 40px;
        line-height: 40px;
        background: lightcyan;
        margin-top: 40px;
    }
</style>