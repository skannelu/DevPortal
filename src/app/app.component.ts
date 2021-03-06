import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {Menu} from "primeng/components/menu/menu";
import {ActivatedRoute, Router} from "@angular/router";

declare var jQuery :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  menuItems: MenuItem[];
  miniMenuItems: MenuItem[];

  @ViewChild('bigMenu') bigMenu : Menu;
  @ViewChild('smallMenu') smallMenu : Menu;

  constructor(private router : Router) {

  }

  ngOnInit() {

    let handleSelected = function(event) {
      let allMenus = jQuery(event.originalEvent.target).closest('ul');
      let allLinks = allMenus.find('.menu-selected');

      allLinks.removeClass("menu-selected");
      let selected = jQuery(event.originalEvent.target).closest('a');
      selected.addClass('menu-selected');
    }

    this.menuItems = [
      {label: 'Dashboard', icon: 'fa-bar-chart', routerLink: ['/dashboard'], command: (event) => handleSelected(event)},
      {label: 'All Shifts', icon: 'fa-clock-o', routerLink: ['/alltimes'], command: (event) => handleSelected(event)},
      {label: 'My Schedule', icon: 'fa-calendar-times-o', routerLink: ['/timesheet'], command: (event) => handleSelected(event)},
      {label: 'Add Project', icon: 'fa-plus', routerLink: ['/projects'], command: (event) => handleSelected(event)},
      {label: 'Profile', icon: 'fa-user-circle-o', routerLink: ['/profile'], command: (event) => handleSelected(event)},
      {label: 'Users', icon: 'fa-users', routerLink: ['/users'], command: (event) => handleSelected(event)}

   
    ]

    this.miniMenuItems = [];
    this.menuItems.forEach( (item : MenuItem) => {
      let miniItem = { icon: item.icon, routerLink: item.routerLink }
      this.miniMenuItems.push(miniItem);
    })

  }

  selectInitialMenuItemBasedOnUrl() {
    let path = document.location.pathname;
    let menuItem = this.menuItems.find( (item) => { return item.routerLink[0] == path });
    if (menuItem) {
      let selectedIcon = this.bigMenu.container.querySelector(`.${menuItem.icon}`);
      jQuery(selectedIcon).closest('li').addClass('menu-selected');
    }
  }

  ngAfterViewInit() {
    this.selectInitialMenuItemBasedOnUrl();
  }



}

