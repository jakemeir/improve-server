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
      DB_URL:string

      
      
      
    }
  }  
