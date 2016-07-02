import {Component} from '@angular/core';
import {NotifyComponent} from '../notify/notify';

@Component({
    moduleId: module.id,
    selector: 'electron-sample',
    templateUrl: 'app.html',
    directives: [NotifyComponent]
})
export class AppComponent{

    public content:string = 'Hello from Barcelona';
}