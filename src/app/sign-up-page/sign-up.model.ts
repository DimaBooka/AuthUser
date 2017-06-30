export class SignUpData {

  private name: string;
  private surName: string;
  private dob: any;
  private phone: string;
  private adress: string;
  private city: string;
  private country: string;
  private username: string;
  private password: string;
  private passwordConfirm: string;
  private employmentStatus: string;
  private employmentPlace: string;
  private annualIncome: string;
  private favouriteSport: string;
  private acceptTerms: string;

  constructor (data) {
    this.name = data['name'];
    this.surName = data['surName'];
    this.dob = data['dob'];
    this.phone = data['phone'];
    this.adress = data['adress'];
    this.city = data['city'];
    this.country = data['country'];
    this.username = data['username'];
    this.password = data['password'];
    this.passwordConfirm = data['passwordConfirm'];
    this.employmentStatus = data['employmentStatus'];
    this.employmentPlace = data['employmentPlace'];
    this.annualIncome = data['annualIncome'];
    this.favouriteSport = data['favouriteSport'];
    this.acceptTerms = data['acceptTerms'];
  }
}
