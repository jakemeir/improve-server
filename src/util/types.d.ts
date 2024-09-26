export interface ApiResponse {
    isSuccessful: boolean;
    displayMessage: string | null;
    description: string | null;
    exception: string | null;
    timestamp: string | null;
    data?: object;
  }

