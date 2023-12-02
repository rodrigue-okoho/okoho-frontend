import {Component, HostListener, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'okoho-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  isScrool: boolean = false;
  @Output() sct= new EventEmitter<void>();
  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 100) {
      this.isScrool = true;
    } else {
      this.isScrool = false;
    }
  }
  goUp() {
   this.sct.emit()
    window.scroll({
      top:0,
      left:0,
      behavior:'smooth'
    })
  }
}
