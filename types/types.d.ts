interface ApiResponse {
    isSuccessful: boolean;
    displayMessage: string | null;
    exception: string | null;
    timestamp: Date | null;
    data: object | null;
  }

 declare namespace NodeJS {
    interface ProcessEnv {
      PORT : string;
      DB_URL:string;
      PRIVATE_KEY:string;
      GOOGLE_CLIENT_ID:string;
      GOOGLE_CLIENT_SECRET:string;
      GOOGLE_CALLBACK_URI:string;

      
      
      
    }
  }  

  declare class CustomError extends Error {
    statusCode?: number;
}


    declare namespace NodeJS {
        interface CustomError {
            statusCode?: number;
        }
    }

