import { Component, ElementRef, EventEmitter, Output, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  templateUrl: "./sash.component.html",
  styleUrls: ["./sash.component.css"],
  selector: "app-sash"
})
export class SashComponent implements OnInit { 
  constructor(private _elementRef: ElementRef) {
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  ngOnInit() {
    this._elementRef.nativeElement.addEventListener("mousedown",this.onMouseDown);
  }

  @Output()
  didStart:EventEmitter<any> = new EventEmitter();

  @Output()
  didEnd: EventEmitter<any> = new EventEmitter();

  @Output()
  didChange: EventEmitter<any> = new EventEmitter();

  onMouseDown(e: MouseEvent) {
    e.stopPropagation();

    this.didStart.emit({
      startx:e.clientX,
      currentx:e.clientX,
      starty:e.clientY,
      currenty:e.clientY
    })

    const onMouseMove = (e: MouseEvent) => {
      
      e.stopPropagation();
      
      this.didChange.emit({          
        currentx:e.clientX,
        currenty:e.clientY
      })
    }
  
    const onMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      
      this.didEnd.emit();

      window.removeEventListener("mouseup", onMouseUp);

      window.removeEventListener("mousemove", onMouseMove);
    }
    
    window.addEventListener("mousemove", onMouseMove);

    window.addEventListener("mouseup", onMouseUp);
  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }
}
