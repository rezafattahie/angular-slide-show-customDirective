import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ISlideImage, ISlideShow } from '../interfaces/slideShow-interface';

@Directive({
  selector: '[appSlideShow]'
})
export class SlideShowDirective implements OnInit {

  @Input('appSlideShowFrom') images: ISlideImage[] = []
  @Input('appSlideShowAutoPlay')
  set autoPlay(val: { autoplay: string, duration: number }) {
    val.autoplay === 'NO' ? this.clearAutoPlay() : this.StartAutoPlay(val.duration);
  }
  @Input('appSlideShowDuration')
  set duration(val: number) {
    this.delay = val
  }

  context: ISlideShow | null = null;
  currentImageIndex: number = 0;
  timer: any;
  delay: number = 2000;
  constructor(
    private templateRef: TemplateRef<ISlideShow>,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.context = {
      $implicit: this.images[0].url,
      handler: {
        nextImage: () => this.nextImage(),
        preImage: () => this.preImage()
      },
      imageNumber: this.currentImageIndex + 1
    };

    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }


  //#region : next and previuse image methods

  nextImage() {
    this.currentImageIndex++;
    if (this.currentImageIndex >= this.images.length) {
      this.currentImageIndex = 0;
    }

    this.context!.$implicit = this.images[this.currentImageIndex].url;
    this.context!.imageNumber = this.currentImageIndex + 1;
    // this.delay = this.images[this.currentImageIndex].duration;
  }

  preImage() {
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.images.length - 1;
    }

    this.context!.$implicit = this.images[this.currentImageIndex].url;
    this.context!.imageNumber = this.currentImageIndex + 1;
    // this.delay = this.images[this.currentImageIndex].duration;
  }
  //#endregion

  StartAutoPlay(duration: number) {
    this.timer = setInterval(() => {
      this.nextImage();
    }, duration)
  }

  clearAutoPlay() {
    clearInterval(this.timer);
  }

}
