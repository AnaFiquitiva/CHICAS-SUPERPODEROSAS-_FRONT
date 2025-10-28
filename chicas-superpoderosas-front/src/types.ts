// src/types.ts

// Tipo de usuario general del sistema
export interface User {
    email: string;
    name?: string;
    userType: "student" | "teacher" | "admin" | "dean";
}

// Tipo de evento de clase
export interface ClassEvent {
    id: string;
    subject: string;
    startTime: string;
    endTime: string;
    room: string;
    day: number;
    color: string;
    professor?: string;
    code?: string;
    credits?: number;
}
