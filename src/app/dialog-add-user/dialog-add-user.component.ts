import { Component, inject } from "@angular/core";
import { User } from "src/models/user.class";
import { Firestore, addDoc, collection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "app-dialog-add-user",
  templateUrl: "./dialog-add-user.component.html",
  styleUrls: ["./dialog-add-user.component.scss"]
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  loading: boolean = false;

  user$!: Observable<User>;
  firestore: Firestore = inject(Firestore);
  userCollection = collection(this.firestore, "users");

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  ngOnInit(): void {}

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    const docRef: any = await addDoc(
      this.userCollection,
      this.user.toJson()
    ).then(() => {
      this.loading = false;
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close(DialogAddUserComponent);
  }
}
