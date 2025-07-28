export class User {
  constructor() {
    this.name = 'Anita';
    this.surname = 'Lawson';
    this.email = 'anita.lawson@example.com';
    this.birthday = '9/5/1944';
    this.phone = '(970) 523-6639';
  }
}

export class Address {
  constructor() {
    this.street = '9805 Central St';
    this.city = 'Denver';
    this.state = 'Colorado';
    this.zip = '80202';
    this.country = 'United States';
    this.password = this.state + Math.floor(Math.random() * 10000);
  }
}
