import { Component, ElementRef } from "@angular/core";
import { Subject } from "rxjs";

export const enum SplitViewLayout {
  vertical, 
  horizontal
}

@Component({
  templateUrl: "./split-view.component.html",
  styleUrls: ["./split-view.component.css"],
  selector: "app-split-view"
})
export class SplitViewComponent { 
  constructor(private _elementRef: ElementRef) {

  }

  sashCurrentx:number;

  sashCurrenty:number;
  
  get layout(): SplitViewLayout {     
    return this._elementRef.nativeElement.classList.contains("vertical") 
    ? SplitViewLayout.vertical 
    : SplitViewLayout.horizontal; 
  }

  private _mainPanelWidth:number;

  private _mainPanelHeight:number;
  
  get mainPanelWidth(): number { 
    if(!this._mainPanelWidth) {
      const style = getComputedStyle(this._elementRef.nativeElement);
      this._mainPanelWidth = +style.getPropertyValue("--grid-main-panel-width").replace('px','');       
    }
      
    return this._mainPanelWidth;   
  }

  set mainPanelWidth(value:number) { 
    this._elementRef.nativeElement.style.setProperty("--grid-main-panel-width",`${this.mainPanelWidth}px`);
    this._mainPanelWidth = value; 
  }

  get mainPanelHeight():number { 
    if(!this._mainPanelHeight) {   
      const style = getComputedStyle(this._elementRef.nativeElement); 
      this._mainPanelHeight = +style.getPropertyValue("--grid-main-panel-height").replace('px','');   
    }

    return this._mainPanelHeight; 
  } 

  set mainPanelHeight(value:number) { 
    this._elementRef.nativeElement.style.setProperty("--grid-main-panel-height",`${this.mainPanelHeight}px`);
    this._mainPanelHeight = value; 
  }

  onSashDidStart($event) {    
    this.sashCurrentx = +$event.startx;
    this.sashCurrenty = +$event.starty;
  }

  onSashDidChange($event) {
    
    const currentx = +$event.currentx;
    const currenty = +$event.currenty;

    if(this.layout == SplitViewLayout.vertical)
      this.mainPanelWidth = this.mainPanelWidth - this.sashCurrentx + currentx;
    
    if(this.layout == SplitViewLayout.horizontal)  
      this.mainPanelHeight = this.mainPanelHeight - this.sashCurrenty + currenty;
    
    this.sashCurrentx = currentx;

    this.sashCurrenty = currenty;
  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }
}
