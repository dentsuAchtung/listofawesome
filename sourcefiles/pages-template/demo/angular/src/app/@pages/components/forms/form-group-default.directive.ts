import { Directive, ElementRef, HostListener, Renderer2, HostBinding, OnInit } from '@angular/core';
declare var pg: any;
@Directive({
  selector: '[pgFormGroupDefault]'
})
export class FormGroupDefaultDirective implements OnInit {
  @HostBinding('class.focused') _isActive: boolean = false;

  @HostListener('click') onclick() {
    if (this._isActive) {
        return;
    }
    this._isActive = true;
    let inputEl = this.El.nativeElement.querySelector('input');
    if (inputEl) {
      inputEl.focus();
    }
  }

  constructor(private El: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    let inputEl = this.El.nativeElement.querySelector('input');
    let labelEl = this.El.nativeElement.querySelector('label');
    if (inputEl) {
      this.renderer.listen(inputEl, 'focus', event => {
        this._isActive = true;
      });
      this.renderer.listen(inputEl, 'focusout', event => {
        this._isActive = false;
        if (!inputEl.value) {
          pg.removeClass(labelEl, 'fade');
        } else {
          pg.addClass(labelEl, 'fade');
        }
      });
    }
  }
}
