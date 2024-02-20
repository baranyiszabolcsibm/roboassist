import { Injectable } from '@angular/core';

export class TabConfig {
  name: string | undefined;

  value: string[] = [];
}



const tabsData: TabConfig[] = [
  { name: 'From This Device', value: ['file'] },
  { name: 'From the Web', value: ['url'] },
  { name: 'Both', value: ['file', 'url'] },
];

@Injectable()
export class Service {

  getTabsData(): TabConfig[] {
    return tabsData;
  }
}
