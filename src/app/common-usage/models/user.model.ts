export class User {

  constructor (
    public token: string = '',
    public name: string = '',
    public surName: string = '',
    public dob: any = {},
    public phone: string = '',
    public adress: string = '',
    public city: string = '',
    public country: string = '',
    public username: string = '',
    public password: string = '',
    public employmentStatus: string = '',
    public employmentPlace: string = '',
    public annualIncome: string = '',
    public favouriteSport: string = '',
  ) {}
}

export class logInUser {
  constructor(
    public username: string = '',
    public password: string = ''
   ){}
}
