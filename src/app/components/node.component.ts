import { Component, Input, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';

@Component({
  //moduleId: module.id,
  selector: 'node-view',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
  
})
export class NodeComponent implements OnInit{ 
    @Input() childrenNodes: any[];
    @Output() callNodesAndOrPropUpdate = new EventEmitter();

    constructor(){ 
    }

    ngOnInit(){
      this.callNodesAndOrPropUpdate.emit();
    }

    onChildEvent(event:any){
        this.callNodesAndOrPropUpdate.emit(event);
    }

    collapse(index:number)
    {
      this.childrenNodes[index].IsCollapsed = !this.childrenNodes[index].IsCollapsed;
    }

    add(index:number, name:string){
      this.childrenNodes[index].IsAdding = !this.childrenNodes[index].IsAdding;
    }

    onAddEnter(value: string, index:number) { 
      this.childrenNodes[index].IsAdding = !this.childrenNodes[index].IsAdding;
      if("" === value){
        let val = confirm("Creating an empty node?");
        if(val === false){
          return;
        }
      }

      var tempNode : any;
        tempNode = {
            id: 100,
            title: value,
            children: [],
            numChildren: 0,
            IsCollapsed: false,
            IsEditing: false,
            IsAdding: false
        }

        this.childrenNodes[index].children.push(tempNode);
        this.childrenNodes[index].numChildren++;
        this.childrenNodes[index].IsCollapsed=false;
        this.callNodesAndOrPropUpdate.emit();
        
    }

    rename(index:number){
      this.childrenNodes[index].IsEditing = !this.childrenNodes[index].IsEditing;
    }

    onEditEnter(value: string, index:number) { 
      //if("" != value)
      this.childrenNodes[index].title = value;
      this.childrenNodes[index].IsEditing = !this.childrenNodes[index].IsEditing;
    }

    delete(index:number){
      let val = confirm("Deleting this node \"" + this.childrenNodes[index].title + "\" and all it's children.");
      if(val === true)
        this.childrenNodes.splice(index, 1);

        this.callNodesAndOrPropUpdate.emit();
    }

    numChildren(nodeData:any){
      return nodeData.children.length;
    }

}