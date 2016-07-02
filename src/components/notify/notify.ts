import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'notify',
    templateUrl: 'notify.html'
})

export class NotifyComponent{

    @Input() public content: string;

    public doNotify(){
        let notification = new Notification('Angular Camp',{
            body: this.content
        });
    }
}