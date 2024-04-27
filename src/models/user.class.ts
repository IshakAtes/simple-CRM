export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    email: string;
    street: string;
    zipCode: number;
    city: string;
    customerNo: number;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.email = obj ? obj.email : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.customerNo = obj ? obj.customerNo : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            email: this.email,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            customerNo: this.customerNo
        };
    }
}