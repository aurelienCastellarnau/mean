import { TestBed, async } from '@angular/core/testing';

import { MeanComponent } from './app/components/mean.component';

/*
** TESTS INSTRUCTIONS
*/
describe('MeanComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MeanComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MeanComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(MeanComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Mean Project... building...');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(MeanComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Mean Project... building...');
  }));
});
