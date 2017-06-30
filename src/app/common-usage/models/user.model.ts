export class User {

  public token: string;
  public name: string;
  public surName: string;
  public dob: any;
  public phone: string;
  public adress: string;
  public city: string;
  public country: string;
  public username: string;
  public password: string;
  public employmentStatus: string;
  public employmentPlace: string;
  public annualIncome: string;
  public favouriteSport: string;

  constructor (data) {
    this.token = data['token'];
    this.name = data['name'];
    this.surName = data['surName'];
    this.dob = data['dob'];
    this.phone = data['phone'];
    this.adress = data['adress'];
    this.city = data['city'];
    this.country = data['country'];
    this.username = data['username'];
    this.password = data['password'];
    this.employmentStatus = data['employmentStatus'];
    this.employmentPlace = data['employmentPlace'];
    this.annualIncome = data['annualIncome'];
    this.favouriteSport = data['favouriteSport'];
  }
}

export class logInUser {
  constructor(
    public username: string,
    public password: string
  ){}
}
