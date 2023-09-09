import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddUserComponent } from "../dialog-add-user/dialog-add-user.component";
import { User } from "src/models/user.class";
import { Sort } from "@angular/material/sort";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent {
  users: User[] = [
    {
      birthDate: 482450400000,
      city: "Menzendorf",
      firstName: "kay",
      lastName: "beckmann",
      street: "Hauptstraße 12",
      zip: "23923"
    },
    {
      birthDate: 482450400000,
      city: "Barssel",
      firstName: "michael",
      lastName: "scheunemann",
      street: "am deich 24",
      zip: "26676"
    },
    {
      birthDate: 482450400000,
      city: "Menzendorf",
      firstName: "tjara",
      lastName: "glogau",
      street: "Hauptstraße 12",
      zip: "23923"
    },
    {
      birthDate: 482450400000,
      city: "Kirchweye",
      firstName: "kim",
      lastName: "beckmann",
      street: "Hauptstraße 8",
      zip: "26123"
    }
  ];
  sortedData!: User[];

  constructor(public dialog: MatDialog) {
    this.sortedData = this.users.slice();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "firstName":
          return compare(a.firstName, b.firstName, isAsc);
        case "lastName":
          return compare(a.lastName, b.lastName, isAsc);
        case "street":
          return compare(a.street, b.street, isAsc);
        case "zip":
          return compare(a.zip, b.zip, isAsc);
        case "city":
          return compare(a.city, b.city, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
