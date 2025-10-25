import React from "react";

// 🔹 ICONO DE INICIO
export const HomeIcon = ({ size = 48, color = "#FFFFFF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12
         M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875
         c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504
         1.125 1.125V21h4.125c.621 0 1.125-.504
         1.125-1.125V9.75M8.25 21h8.25"
        />
    </svg>
);

// 🔹 ICONO DE HORARIO
export const ScheduleIcon = ({ size = 48, color = "#FFFFFF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25
         m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75
         m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
    </svg>
);

// 🔹 ICONO DE SOLICITUDES
export const RequestsIcon = ({ size = 48, color = "#FFFFFF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108
         c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0
         c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75
         2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15
         c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08
         C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875
         c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125
         1.125 1.125h9.75c.621 0 1.125-.504
         1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
        />
    </svg>
);

// 🔹 ICONO DE SEMÁFORO (versión minimalista y limpia)
export const SemaphoreIcon = ({ size = 48, color = "#FFFFFF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
    >
        <rect
            x="8.5"
            y="3"
            width="7"
            height="18"
            rx="2"
            ry="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="7" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="17" r="1.5" />
    </svg>
);

// 🔹 ICONO DE PERFIL
export const ProfileIcon = ({ size = 48, color = "#FFFFFF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75
         a7.488 7.488 0 0 0-5.982 2.975
         m11.963 0a9 9 0 1 0-11.963 0
         A8.966 8.966 0 0 1 12 21
         a8.966 8.966 0 0 1-5.982-2.275
         M15 9.75a3 3 0 1 1-6 0
         3 3 0 0 1 6 0Z"
        />
    </svg>
);

// 🔹 ICONO DE AJUSTES
export const SettingsIcon = ({ size = 48, color = "#FFFFFF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484
         c-1.076-.091-2.264.071-2.95.904
         l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586
         l8.684-7.152c.833-.686.995-1.874.904-2.95
         a4.5 4.5 0 0 1 6.336-4.486
         l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25
         l3.276-3.276c.256.565.398 1.192.398 1.852Z"
        />
    </svg>
);

// 🔹 ICONO DE CERRAR SESIÓN
export const LogoutIcon = ({ size = 48, color = "#FFFFFF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5
         A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15
         M18 9l3 3m0 0-3 3m3-3H9"
        />
    </svg>
);

// 🔹 ICONO DE GESTIÓN DE GRUPOS
export const ManagementIcon = ({ size = 48, color = "#FFFFFF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372
         9.337 9.337 0 0 0 4.121-.952
         4.125 4.125 0 0 0-7.533-2.493
         M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07
         M15 19.128v.106A12.318 12.318 0 0 1 8.624 21
         c-2.331 0-4.512-.645-6.374-1.766l-.001-.109
         a6.375 6.375 0 0 1 11.964-3.07
         M12 6.375a3.375 3.375 0 1 1-6.75 0
         3.375 3.375 0 0 1 6.75 0Zm8.25 2.25
         a2.625 2.625 0 1 1-5.25 0
         2.625 2.625 0 0 1 5.25 0Z"
        />
    </svg>
);