import { Component, inject } from "@angular/core";
import { User } from "src/models/user.class";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
@Component({
  selector: "app-dialog-add-user",
  templateUrl: "./dialog-add-user.component.html",
  styleUrls: ["./dialog-add-user.component.scss"]
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;

  user$!: Observable<User>;
  firestore: Firestore = inject(Firestore);
  userCollection = collection(this.firestore, "users");

  constructor() {}

  ngOnInit(): void {}

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);

    const docRef: any = await addDoc(
      this.userCollection,
      this.user.toJson()
    ).then(() => {
      this.user.firstName = "";
    });
  }
}
