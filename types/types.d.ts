interface ApiResponse {
    isSuccessful: boolean;
    displayMessage: string | null;
    exception: string | null;
    timestamp: Date | null;
    data: object | null;
  }

  interface IUser {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: string;
  }

 declare namespace NodeJS {
    interface ProcessEnv {
      PORT : string;
      DB_URL:string

      
      
      
    }
  }  