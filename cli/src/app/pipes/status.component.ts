import { Pipe, PipeTransform } from '@angular/core';
import { Agent }               from '../model/agent';

@Pipe({
    name: 'status',
    pure: false
})
export class StatusPipe implements PipeTransform {
    transform(agents: any[], filter: Agent): any {
        if (!agents || !filter) {
            return agents;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return agents.filter(agent => agent.status.indexOf(filter.status) !== -1);
    }
}
