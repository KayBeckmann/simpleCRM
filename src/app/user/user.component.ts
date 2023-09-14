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

  /*
  game$: Observable<any>; // Observable -> Bekommt ein Update bei Änderung
  gameCollection = collection(this.firestore, `games`);
   */

  constructor(public dialog: MatDialog) {
    // this.sortedData = this.users.slice();

    this.user$ = collectionData(this.userCollection);

    this.user$.forEach((element) => {
      for (let index = 0; index < element.length; index++) {
        console.log(element[index]);
      }
    });

    /*
        this.game$.forEach((element) => {
      for (let index = 0; index < element.length; index++) {
        if (element[index].id == ID) {
          this.game.players = element[index].players;
          this.game.stack = element[index].stack;
          this.game.playedCards = element[index].playedCards;
          this.game.currentPlayer = element[index].currentPlayer;
          this.game.pickCardAnimation = element[index].pickCardAnimation;
          this.game.currentCard = element[index].currentCard;
          this.gameID = ID;
        }
      }

     */
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

/*

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
 */
