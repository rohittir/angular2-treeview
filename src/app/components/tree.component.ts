import { Component, ViewChild, OnInit } from '@angular/core';
import { NodeComponent } from './node.component';
import { TreeService } from '../services/tree.service'

@Component({
   // moduleId: module.id,
  selector: 'tree-view',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [TreeService]

})

export class TreeComponent implements OnInit { 
    rootNode : node;
    nodeID : number;
    value = '';
    fetchedTree: JsonNode;

    //@ViewChild(NodeComponent)
    //private NodeComp: NodeComponent;

    constructor(private TreeService: TreeService){
        this.nodeID = 10;

        this.rootNode = {
            id: this.nodeID++,
            title: 'root',
            IsAndNode : false,
            children: [],
            IsCollapsed: false,
            IsEditing: false,
            IsAdding: false,
            mShowAndOR:false
        };

        // this.TreeService.getTrees().subscribe(fetchedTree => {
        // this.fetchedTree = fetchedTree;
        // for(var i = 0; i < this.fetchedTree.nodes.length; i++){
        //     var child = this.addChild(this.rootNode, this.fetchedTree.nodes[i].id, this.fetchedTree.nodes[i].title);
        //     this.addChildren(child, this.fetchedTree.nodes[i]);
        // }
        // });     
    }

    computeNumAndNodes(nodeData: node){
        var numAndNodes = 0;
        for(var i = 0; i < nodeData.children.length; i++)
        {
            if(this.rootNode.children[i].IsAndNode === true)
                numAndNodes++;

            //var numNodes = this.computeChildAdnNode(nodeData.children[i]);
            //numAndNodes = numAndNodes + numNodes;
        }
        return numAndNodes;
    }

    computeChildAdnNode(nodeData: node){
        var numAndNodes = 0;
        for(var i = 0; i < nodeData.children.length; i++)
        {
            if(this.rootNode.children[i].IsAndNode === true)
                numAndNodes++;

            var numNodes = this.computeChildAdnNode(nodeData.children[i]);
            //numAndNodes = numAndNodes + numNodes;
        }
        return numAndNodes;
    }

    addChildren(nodeData:node, fetchedNode:JsonNode){
        for(var i = 0; i < fetchedNode.nodes.length; i++){
        var child = this.addChild(nodeData, fetchedNode.nodes[i].id, fetchedNode.nodes[i].title);
        this.addChildren(child, fetchedNode.nodes[i]);
        }
    }

    ngOnInit() {

        //console.log('before');
        //setTimeout(() => {

    if(this.rootNode.children.length <= 0){
        var root1 = this.addChild(this.rootNode, this.nodeID++, 'Apple Products');

        var Computer = this.addChild(root1, this.nodeID++, 'Computer');
        var Mobile = this.addChild(root1, this.nodeID++, 'Mobile');
        var Tablet = this.addChild(root1, this.nodeID++, 'Tablet');
        var TV = this.addChild(root1, this.nodeID++, 'Television');
        var Watch = this.addChild(root1, this.nodeID++, 'Smart Watch');
        var Misc = this.addChild(root1, this.nodeID++, 'Miscellaneous');

        var Computer_Air = this.addChild(Computer, this.nodeID++, 'Macbook Air');
        //var Computer_Air1 = this.addChild(Computer_Air, this.nodeID++, 'Macbook Air1');
        var Computer_Pro = this.addChild(Computer, this.nodeID++, 'Macbook Pro');
        var Computer_iMac = this.addChild(Computer, this.nodeID++, 'iMac');
        var Computer_MacMini = this.addChild(Computer, this.nodeID++, 'Mac Mini');
        
        var Mobile5 = this.addChild(Mobile, this.nodeID++, 'iPhone 5');
        var Mobile6 = this.addChild(Mobile, this.nodeID++, 'iPhone 6');
        //var Mobile51 = this.addChild(Mobile5, this.nodeID++, 'iPhone 5S');
        var Mobile61 = this.addChild(Mobile6, this.nodeID++, 'iPhone 6S');
        var Mobile7 = this.addChild(Mobile, this.nodeID++, 'iPhone 7');

        var iPadPro = this.addChild(Tablet, this.nodeID++, 'iPad Pro');
        var iPadProFamily = this.addChild(Tablet, this.nodeID++, 'iPad Pro Family');
        var iPadMini = this.addChild(Tablet, this.nodeID++, 'iPad Mini');

        var AppleTv = this.addChild(TV, this.nodeID++, 'ApleTV');

        var WatchSer1 = this.addChild(Watch, this.nodeID++, 'Series 1');
        var WatchSer2 = this.addChild(Watch, this.nodeID++, 'Series 2');

        var WatchSer2Nike = this.addChild(WatchSer2, this.nodeID++, 'Nike Edition');
        var WatchSer2Hermes = this.addChild(WatchSer2, this.nodeID++, 'Hermes Edition');

        var MisciPod = this.addChild(Misc, this.nodeID++, 'iPod');
        var MiscAccess = this.addChild(Misc, this.nodeID++, 'Accessories');
        var MiscDisplay = this.addChild(Misc, this.nodeID++, 'Displays');
    }

        this.updateNodesWithAndOr();
        //this.print(this.rootNode);
        //console.log(this.rootNode);

       // }, 0);
        //console.log('after');

        //console.log(this.getTotalAndNodes(this.rootNode));
    }

    addChild(nodeObj:node, id:number, name:string){
        var tempNode : node;
        tempNode = {
            id: id,
            title: name,
            children: [],
            IsAndNode:false,
            IsCollapsed: false,
            IsEditing: false,
            IsAdding: false,
            mShowAndOR:false,
            mAndNodes:0,
            mORNodes:0
        }

        nodeObj.children.push(tempNode);
        return nodeObj.children[nodeObj.children.length-1];
    }

    computeAndORNodes(nodeObj: node){
        nodeObj.mAndNodes = this.getTotalAndNodes(nodeObj);
        nodeObj.mORNodes = this.getTotalORNodes(nodeObj);
        for(var i = 0; i < nodeObj.children.length; i++)
        {
             this.computeAndORNodes(nodeObj.children[i]);
        }
    }

   getTotalAndNodes(nodeObj:node){
        var numNodes = 0;
        for(var i = 0; i < nodeObj.children.length; i++)
        {
            if(nodeObj.children[i].children.length <= 0)
                continue;
            if(nodeObj.children[i].IsAndNode === true){
                numNodes++;
            }

            numNodes = numNodes + this.getTotalAndNodes(nodeObj.children[i]);
        }

        return numNodes;
    }

    getTotalORNodes(nodeObj:node){
        var numNodes = 0;
        for(var i = 0; i < nodeObj.children.length; i++)
        {
            if(nodeObj.children[i].children.length <= 0)
                continue;

            if(nodeObj.children[i].IsAndNode === false){
                numNodes++;
            }

            numNodes = numNodes + this.getTotalORNodes(nodeObj.children[i]);
        }

        return numNodes;
    }

    getTotalNodes(nodeObj:node){
        var numNodes = nodeObj.children.length;
        for(var i = 0; i < nodeObj.children.length; i++)
        {
            numNodes = numNodes + this.getTotalNodes(nodeObj.children[i]);
        }

        return numNodes;
    }

    getTerminalNodes(nodeObj:node){
        var numChildrenNodes = 0;
        if(nodeObj.children.length == 0){
            numChildrenNodes = 1;
        }

        for(var i = 0; i < nodeObj.children.length; i++)
        {
            if(nodeObj.children[i].children.length == 0){
                numChildrenNodes++;
            }
            else numChildrenNodes = numChildrenNodes+this.getTerminalNodes(nodeObj.children[i]);
        }

        return numChildrenNodes;
    }

    onExpandAll(){
        for(var i = 0; i < this.rootNode.children.length; i++){
            this.expand(this.rootNode.children[i]);
        }
    }


    expand(nodeObj:node){
        nodeObj.IsCollapsed = false;
        for(var i = 0; i < nodeObj.children.length; i++){
            this.expand(nodeObj.children[i]);
        }
    }

    onCollapseAll(){
        for(var i = 0; i < this.rootNode.children.length; i++){
            this.collapse(this.rootNode.children[i]);
        }
    }


    collapse(nodeObj:node){
        nodeObj.IsCollapsed = true;
        for(var i = 0; i < nodeObj.children.length; i++){
            this.collapse(nodeObj.children[i]);
        }
    }

    onAddRootNodeEnter(name:string){
        this.addChild(this.rootNode, this.nodeID++, name);
        this.value = '';
    }

    onNodeEvent(event:any){
        //console.log('recieved emit');
        this.updateNodesWithAndOr();
       this.computeAndORNodes(this.rootNode);
    }

    updateNodesWithAndOr(){
        // if(this.rootNode.children.length > 1){
        //     this.rootNode.IsAndNode = false;
        // }
        // else {
            this.rootNode.IsAndNode = true;
        //}

        for(var i = 0; i < this.rootNode.children.length; i++)
        {
            this.updateNodeAndOR(this.rootNode.children[i], this.rootNode);
        }
    }

    updateNodeAndOR(nodeData:node, parentNode:node){
        nodeData.IsAndNode = !parentNode.IsAndNode;

        if(nodeData.children.length === 1){
            nodeData.IsAndNode = true;
        }

        for(var i = 0; i < nodeData.children.length; i++)
        {
            this.updateNodeAndOR(nodeData.children[i], nodeData);
        }
    }

    // SendDataToServer(){
    //     this.TreeService.sendData(this.rootNode).subscribe(

    //         response => console.log(response), // success
    //         error => console.log(error),       // error
    //         () => console.log('completed')     // complete
    // }

    print(nodeData:node){
        for(var i=0; i < nodeData.children.length; i++) {
            console.log(nodeData.children[i].title + ":" + nodeData.children[i].IsAndNode);
            this.print(nodeData.children[i]);
        }
    }

    

}

interface node {
    id? : number;
    title : string;
    children : node[];
    IsAndNode: boolean;
    IsCollapsed? : boolean;
    IsEditing? : boolean;
    IsAdding? : boolean;
    mShowAndOR:boolean;
    mAndNodes?:number;
    mORNodes?:number;
}

interface JsonNode{
    id: number;
    title: string;
    nodes: JsonNode[];
}

// interface tree{
//     posts : post[];
// }