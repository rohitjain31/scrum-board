import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CardViewComponent } from './card-view.component';

describe('CardViewComponent', () => {
    let fixture: ComponentFixture<CardViewComponent>;
    let component: CardViewComponent;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            CardViewComponent,
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('BASIC', () => {
        it('should create the app', async(() => {
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }));

        it(`should have as title 'app'`, async(() => {
            const app = fixture.debugElement.componentInstance;
            expect(app.issueValue).toBeUndefined();
        }));
    });

    describe('', () => {
        beforeEach(() => {
            component.issueValue = {
                id: '1',
                title: 'Issue1',
                description: 'This is issue 1',
                storyPoint: 3,
                type: 'bug',
                stage: 'backlog'
            };
            fixture.detectChanges();
        });

        it('should verify card title', async(() => {
            expect(fixture.debugElement.nativeElement.querySelector('.example-card')).toBeDefined();
         }));

         it('should verify card headers title and subtitle', async(() => {
            expect(fixture.debugElement.nativeElement.querySelector('.card-title')).toBeDefined();
            expect(fixture.debugElement.nativeElement.querySelector('.card-subtitle')).toBeDefined();
            expect(fixture.debugElement.nativeElement.querySelector('.card-title').innerText).toBe('Issue1');
            expect(fixture.debugElement.nativeElement.querySelector('.card-subtitle').innerText).toBe('Phase backlog');
         }));

         it('should verify card description', async(() => {
            expect(fixture.debugElement.nativeElement.querySelector('.card-description')).toBeDefined();
            expect(fixture.debugElement.nativeElement.querySelector('.card-description').innerText).toBe('This is issue 1');
         }));

         it('should verify card story type', async(() => {
            expect(fixture.debugElement.nativeElement.querySelector('.card-info')).toBeDefined();
            expect(fixture.debugElement.nativeElement.querySelector('.card-info')
                .querySelectorAll('span')[0].innerText)
                .toEqual('Story type: bug');
            expect(fixture.debugElement.nativeElement.querySelector('.card-info')
                .querySelectorAll('span')[1].innerText)
                .toEqual('Story Point: 3');
         }));

         it('should verify card story type', async(() => {
            expect(fixture.debugElement.nativeElement.querySelector('mat-card-actions')).toBeDefined();
            expect(fixture.debugElement.nativeElement.querySelector('mat-card-actions')
                .querySelectorAll('mat-icon')[0].innerText)
                .toEqual('delete');
            expect(fixture.debugElement.nativeElement.querySelector('mat-card-actions')
                .querySelectorAll('mat-icon')[1].innerText)
                .toEqual('edit');
         }));
    });



});
