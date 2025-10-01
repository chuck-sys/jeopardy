import { Directive, AfterContentInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocus implements AfterContentInit {

  constructor(private el: ElementRef) { }

  ngAfterContentInit(): void {
    // do this on next event loop interation; thus no specified timeout
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}
