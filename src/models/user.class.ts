export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  street: string;
  zip: string;
  city: string;

  /**
   *
   * @param user JSON for the new user
   */
  constructor(user?: any) {
    this.firstName = user ? user.firstName : "";
    this.lastName = user ? user.lastName : "";
    this.birthDate = user ? user.birthDate : 0;
    this.street = user ? user.street : "";
    this.zip = user ? user.zip : "";
    this.city = user ? user.city : "";
  }

  public toJson() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      zip: this.zip,
      city: this.city
    };
  }
}
