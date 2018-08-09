import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('appHighlight') highlightColor: string;

  constructor(private el: ElementRef) {

  }

  @HostListener('mouseenter') onMouseEnter() {
    console.log(this.highlightColor);
    this.highlight(this.highlightColor || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  private highlight(color: string) {
    this.el.nativeElement.style.background = color;
  }
}



// Structural Directives change the structure of the view. Two examples are NgFor and NgIf. Learn about them in the Structural Directives guide.

// Attribute directives are used as attributes of elements. The built-in NgStyle directive in the Template Syntax guide, for example,
// can change several element styles at the same time.

// It's the brackets ([]) that make it an attribute selector. Angular locates each element in the template that has an attribute named appHighlight and applies the
// logic of this directive to that element

// The directive could be more dynamic. It could detect when the user mouses into or out of the element and respond by setting or clearing the highlight color.
// Begin by adding HostListener to the list of imported symbols.

