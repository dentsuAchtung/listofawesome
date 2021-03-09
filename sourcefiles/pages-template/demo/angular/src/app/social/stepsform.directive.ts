import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
declare var pg: any;
declare var stepsForm: any;

@Directive({
  selector: '[stepsform]'
})
export class StepsformDirective {
  constructor(private select: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    const status = this.select.nativeElement;
    const forms = new stepsForm(status, {
      onSubmit: function(form) {
        pg.addClass(status.querySelector('.status-form-inner'), 'hide');
        // form.submit()
        // show success message
        const finalMessage = status.querySelector('.final-message');
        if (finalMessage) {
          finalMessage.innerHTML = '<i class="pg-icon m-r-5">tick_circle</i> Status updated';
        }
        pg.addClass(finalMessage, 'show');
      }
    });
  }
}
