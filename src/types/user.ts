export interface User {
  name: string;
  phoneNumber: string;
  cpf: string;
}

export interface UserRecord extends User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
