import React from "react";

// 🔔 ICONO DE NOTIFICACIÓN
export const NotificationIcon = ({size = 24, color = "#222"}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        stroke={color}
        fill="none"
        strokeWidth="1.5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11
             a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341
             C8.67 6.165 8 7.388 8 8.75v5.408c0 .53-.21 1.04-.586 1.416L6 17h5"
        />
    </svg>
);

// 🔹 ICONO DE INICIO
export const HomeIcon = ({size = 48, color = "#FFFFFF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}
         width={size} height={size}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439
            1.591 0L21.75 12M4.5 9.75v10.125c0
            .621.504 1.125 1.125 1.125H9.75v-4.875
            c0-.621.504-1.125 1.125-1.125h2.25c.621
            0 1.125.504 1.125 1.125V21h4.125c.621
            0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
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
            d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
        />
    </svg>
);

// 🔹 ICONO DE SOLICITUDES
export const RequestsIcon = ({size = 48, color = "#FFFFFF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}
         width={size} height={size}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3
            .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108
            c0-1.135-.845-2.098-1.976-2.192a48.424
            48.424 0 0 0-1.123-.08m-5.801
            0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5
            a.75.75 0 0 0 .75-.75 2.25 2.25
            0 0 0-.1-.664m-5.8 0A2.251 2.251
            0 0 1 13.5 2.25H15c1.012 0 1.867.668
            2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08
            C9.095 4.01 8.25 4.973 8.25
            6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125
            1.125v11.25c0 .621.504 1.125
            1.125 1.125h9.75c.621 0 1.125-.504
            1.125-1.125V9.375c0-.621-.504-1.125
            -1.125-1.125H8.25Z"/>
    </svg>
);

// 🔹 ICONO DE SEMÁFORO
export const SemaphoreIcon = ({size = 48, color = "#FFFFFF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}
         width={size} height={size}>
        <rect x="8.5" y="3" width="7" height="18" rx="2" ry="2"
              strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="1.5"/>
        <circle cx="12" cy="12" r="1.5"/>
        <circle cx="12" cy="17" r="1.5"/>
    </svg>
);

// 🔹 ICONO DE PERFIL
export const ProfileIcon = ({size = 48, color = "#FFFFFF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}
         width={size} height={size}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12
            15.75a7.488 7.488 0 0 0-5.982
            2.975m11.963 0a9 9 0 1 0-11.963
            0A8.966 8.966 0 0 1 12 21a8.966
            8.966 0 0 1-5.982-2.275M15
            9.75a3 3 0 1 1-6 0 3 3 0
            0 1 6 0Z"/>
    </svg>
);

// 🔹 ICONO DE AJUSTES
export const SettingsIcon = ({size = 48, color = "#FFFFFF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}
         width={size} height={size}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M21.75 6.75a4.5 4.5 0 0
            1-4.884 4.484c-1.076-.091-2.264.071
            -2.95.904l-7.152 8.684a2.548 2.548
            0 1 1-3.586-3.586l8.684-7.152
            c.833-.686.995-1.874.904-2.95
            a4.5 4.5 0 0 1 6.336-4.486
            l-3.276 3.276a3.004 3.004
            0 0 0 2.25 2.25l3.276-3.276
            c.256.565.398 1.192.398 1.852Z"/>
    </svg>
);

// 🔹 ICONO DE CERRAR SESIÓN
export const LogoutIcon = ({size = 48, color = "#FFFFFF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}
         width={size} height={size}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0
            13.5 3h-6A2.25 2.25 0 0 0
            5.25 5.25v13.5A2.25 2.25 0
            0 0 7.5 21h6a2.25 2.25 0
            0 0 2.25-2.25V15M18 9l3
            3m0 0-3 3m3-3H9"/>
    </svg>
);

// 🔹 ICONO DE GESTIÓN DE GRUPOS
export const ManagementIcon = ({size = 48, color = "#FFFFFF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}
         width={size} height={size}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0
            2.625.372 9.337 9.337 0 0 0
            4.121-.952 4.125 4.125 0 0
            0-7.533-2.493M15 19.128v-.003
            c0-1.113-.285-2.16-.786-3.07M15
            19.128v.106A12.318 12.318 0
            0 1 8.624 21c-2.331 0-4.512-.645
            -6.374-1.766l-.001-.109a6.375
            6.375 0 0 1 11.964-3.07M12
            6.375a3.375 3.375 0 1 1-6.75
            0 3.375 3.375 0 0 1 6.75
            0Zm8.25 2.25a2.625 2.625
            0 1 1-5.25 0 2.625 2.625
            0 0 1 5.25 0Z"/>
    </svg>
);
export const BackArrowIcon = ({size = 28, color = "#A30000"}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="15 18 9 12 15 6"/>
    </svg>
);
export const LocationIcon = ({ size = 48, color = "#FFFFFF" }) => (
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
            d="M12 11.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 21s-6-7.5-6-10.5a6 6 0 1 1 12 0c0 3-6 10.5-6 10.5z"
        />
    </svg>
);
export const ProfessorIcon = ({ size = 48, color = "#FFFFFF" }) => (
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
            d="M15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 21v-1.5a4.5 4.5 0 0 1 9 0v1.5M19.5 21v-1.5a4.5 4.5 0 0 0-9 0v1.5"
        />
    </svg>
);
export const CreditsIcon = ({ size = 48, color = "#FFFFFF" }) => (
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
            d="M12 6v12m0 0l-7.5-3.75V6L12 9l7.5-3V18.75L12 18z"
        />
    </svg>
);
// ✔ ICONO DE APROBADA / CHECK
export const CheckIcon = ({ size = 24, color = "#17C964" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// ⏰ ICONO DE REVISIÓN / CLOCK
export const ClockIcon = ({ size = 24, color = "#1E90FF" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

// ❌ ICONO DE RECHAZADA / X
export const CrossIcon = ({ size = 24, color = "#F31260" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ⏳ ICONO DE PENDIENTE / HOURGLASS
export const HourglassIcon = ({ size = 24, color = "#FFA500" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 2h12M6 22h12M6 2v6l6 6-6 6v6M18 2v6l-6 6 6 6v6" />
    </svg>
);

// 👁 ICONO DE VER DETALLES / EYE
export const EyeIcon = ({ size = 24, color = "#222" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
// 📄 ICONO DE DOCUMENTO / DOCUMENT
export const DocumentIcon = ({ size = 24, color = "#222" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>
);

