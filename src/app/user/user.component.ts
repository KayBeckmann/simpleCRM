import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddUserComponent } from "../dialog-add-user/dialog-add-user.component";
import { User } from "src/models/user.class";
import { Sort } from "@angular/material/sort";
import { Firestore, collection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { collectionData } from "rxfire/firestore";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent {
  users: User[] = [];
  sortedData!: User[];

  firestore: Firestore = inject(Firestore);
  user$!: Observable<any>;
  userCollection = collection(this.firestore, "users");

  /**
   *
   * @param dialog
   */
  constructor(public dialog: MatDialog) {
    this.user$ = collectionData(this.userCollection, { idField: "id" });
    this.loadUserList();
    this.user$.subscribe(() => {
      this.loadUserList();
    });
  }

  /**
   * Open 'Add User'-Dialog
   */
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  /**
   *
   * @param sort
   * @returns
   */
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

  /**
   *
   */
  loadUserList() {
    this.users = new Array();
    this.user$.forEach((element) => {
      for (let index = 0; index < element.length; index++) {
        // console.log(element[index].firstName, ": ", element[index].id);
        this.users.push(
          new User({
            firstName: element[index].firstName,
            lastName: element[index].lastName,
            birthDate: element[index].birthDate,
            street: element[index].street,
            zip: element[index].zip,
            city: element[index].city,
            email: element[index].email,
            id: element[index].id
          })
        );
      }
      this.sortedData = this.users.slice();
    });
  }

  editUser(id: string) {
    console.log(id);
  }

  deleteUser(id: string) {
    console.log(id);
  }
}

/**
 *
 * @param a
 * @param b
 * @param isAsc
 * @returns
 */
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
