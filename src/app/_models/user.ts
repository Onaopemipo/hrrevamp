
export class UserClass {
  token: string | undefined;
  userId: string | undefined;
  userType: any
  isProfileComplete: boolean | undefined;

  constructor(data?: User) {
    if (data) {
        for (var property in data) {
            if (data.hasOwnProperty(property))
                (<any>this)[property] = (<any>data)[property];
        }
    }
}



}


export interface User {
  token?: string | undefined;
  userId?: string | undefined;
  userType?: any
  isProfileComplete?: boolean | undefined;
}

export interface socialUser {
  email?: string,
  displayName?: string,
  emailVerified?: boolean,
  photoURL?: string,
  phoneNumber?: string
}

export interface userRegistration{
  email?: string,
  fullName?: string,
  password?: string,
  confirmPassword?: string,
  userType?: number,
  businessName?: string,
  businessAnniversary?: string,
  tcAccepted?: boolean,
  userPicsUrl?: string
}