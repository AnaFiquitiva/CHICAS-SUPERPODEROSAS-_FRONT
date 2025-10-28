import React, { useState } from "react";
import "./StudentSchedule.css";
import TopBar from "./TopBar";
import {
    CreditsIcon,
    ScheduleIcon,
    LocationIcon,
    RequestsIcon,
    ProfessorIcon,
} from "./Icons";

/*
  Archivo: StudentSchedule.jsx
  Comentarios: Pantalla de horario semanal con bloques de 1h
  - Clases encajan visualmente según hora real
  - Fechas debajo de días se sincronizan con MiniCalendar
  - Código en inglés, comentarios y textos en español
*/

const hourHeight = 48; // 1 hora = 48px
const TIME_BLOCKS = [
    "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM"
];

const DAYS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

const MOCK_CLASSES = [
    { id:"c1", title:"MATE PRYE - 4", teacher:"Prof. Ramírez", room:"A-201", day:0, startHour:13, endHour:14.5, color:"#FFEDD5", accent:"#990000", category:"Matemáticas", description:"Clase teórica + ejercicios." },
    { id:"c2", title:"ISIS ODSC - 2", teacher:"Ing. Pérez", room:"Lab 3", day:0, startHour:14.5, endHour:16, color:"#E6FFF0", accent:"#17C964", category:"Laboratorio", description:"Prácticas en grupo." },
    { id:"c3", title:"NIELATO EGI3 - 8", teacher:"Dra. Gómez", room:"B-104", day:1, startHour:10, endHour:11.5, color:"#FFF0F6", accent:"#F31260", category:"Computación", description:"Clases y revisión de tareas." },
    { id:"c4", title:"OTRA FUPR - 8", teacher:"MSc. Torres", room:"A-101", day:1, startHour:11.5, endHour:13, color:"#FFF7E6", accent:"#FF9900", category:"Intro", description:"Seminario y discusión." },
    { id:"c5", title:"MATE PRYE - 4", teacher:"Dra. López", room:"B-201", day:1, startHour:14.5, endHour:16, color:"#E0F7FF", accent:"#0077CC", category:"Química", description:"Teoría y práctica." },
    { id:"c6", title:"ISIS DOSW - 1", teacher:"Prof. Martínez", room:"C-101", day:1, startHour:16, endHour:17.5, color:"#FFF0E6", accent:"#FF6600", category:"Humanidades", description:"Clases interactivas." },
];

function StudentSchedule() {
    const [selectedClass, setSelectedClass] = useState(null);
    const [calendarDate, setCalendarDate] = useState(new Date());

    const handleSelectClass = (cls) => setSelectedClass(cls);
    const handleClearSelection = () => setSelectedClass(null);

    // 🔹 Función para obtener el lunes de la semana de referencia
    const getStartOfWeek = (date) => {
        const day = date.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const monday = new Date(date);
        monday.setDate(date.getDate() + diff);
        monday.setHours(0,0,0,0);
        return monday;
    };

    const monday = getStartOfWeek(calendarDate);
    const weekDates = Array.from({length:6}, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
    // 🔹 Clases próximas según clase seleccionada
    const getNextClasses = (baseClass) => {
        if (!baseClass) return [];
        return MOCK_CLASSES
            .filter(c => c.id !== baseClass.id)
            .filter(c => c.day > baseClass.day || (c.day === baseClass.day && c.startHour > baseClass.endHour))
            .sort((a,b) => a.day - b.day || a.startHour - b.startHour);
    };

    return (
        <>
            <TopBar/>

            <div className="ss-page">
                <div className="ss-header">
                    <h1>Horario de Clase</h1>
                    <div className="ss-header-actions">
                        <button className="btn primary">Exportar</button>
                        <button className="btn outline">Filtrar</button>
                    </div>
                </div>

                <div className="ss-layout">
                    {/* LATERAL IZQUIERDO */}
                    <aside className="ss-left">
                        <MiniCalendar currentDate={calendarDate} onDateChange={setCalendarDate}/>
                        <div className="upcoming">
                            <h3>Próximas clases</h3>
                            {MOCK_CLASSES.slice(0, 5).map(c => (
                                <div key={c.id} className="upcoming-item" onClick={() => handleSelectClass(c)}>
                                    <div className="dot" style={{background:c.accent}}/>
                                    <div className="u-info">
                                        <div className="u-title">{c.title}</div>
                                        <div className="u-meta">{formatHour(c.startHour)} - {formatHour(c.endHour)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* CENTRO: HORARIO */}
                    <main className="ss-center" onClick={handleClearSelection}>
                        {/* Header de días */}
                        <div className="grid-header" style={{ gridTemplateColumns: `72px repeat(${DAYS.length}, 1fr)` }}>
                            <div className="time-col"/>
                            {DAYS.map((d, dayIdx) => (
                                <div key={d} className="day-col">
                                    <div className="day-title">{d}</div>
                                    <div className="day-sub">
                                        {weekDates[dayIdx].getDate()} {weekDates[dayIdx].toLocaleString("es-ES",{ month:"short" })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Grid de horario */}
                        <div className="schedule-grid" style={{ gridTemplateColumns: `72px repeat(${DAYS.length}, 1fr)` }}>
                            {/* Columna de horas */}
                            <div className="time-col">
                                {TIME_BLOCKS.map((t, idx) => (
                                    <div key={idx} className="time-cell">{t}</div>
                                ))}
                            </div>

                            {/* Columnas por día */}
                            {DAYS.map((_, dayIdx) => (
                                <div key={dayIdx} className="day-column">
                                    {TIME_BLOCKS.map((_, idx) => (<div key={idx} className="grid-cell"/>))}
                                    {MOCK_CLASSES.filter(c => c.day === dayIdx).map(c => (
                                        <ClassCard key={c.id} classData={c} onClick={() => handleSelectClass(c)}/>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </main>

                    {/* PANEL DERECHO */}
                    <aside className={`ss-right ${selectedClass ? "open" : "closed"}`}>
                        <DetailPanel cls={selectedClass} onClose={handleClearSelection}/>
                    </aside>
                </div>
            </div>
        </>
    );
}

/* ---------------- Subcomponentes ---------------- */
function UpcomingItem({ cls, onClick, showDetails=false }) {
    return (
        <div className={`upcoming-item ${showDetails ? "detailed" : ""}`} onClick={onClick}>
            <div className="dot" style={{background: cls.accent}}/>
            <div className="u-info">
                <div className="u-title">{cls.title}</div>
                <div className="u-meta">{DAYS[cls.day]} {formatHour(cls.startHour)} - {formatHour(cls.endHour)}</div>
                {showDetails && (
                    <>
                        <div className="u-room"><LocationIcon size={14} color="#A30000"/> {cls.room}</div>
                        <div className="u-teacher"><ProfessorIcon size={14} color="#A30000"/> {cls.teacher}</div>
                        <div className="u-credits"><CreditsIcon size={14} color="#A30000"/> {cls.credits || "1 crédito"}</div>
                    </>
                )}
            </div>
        </div>
    );
}
function MiniCalendar({ currentDate, onDateChange }) {
    const [current, setCurrent] = useState(currentDate);
    const year = current.getFullYear();
    const month = current.getMonth();
    const monthName = current.toLocaleString("es-ES", { month: "long" });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const daysArray = [];

    for (let i=0;i<(firstDay===0?6:firstDay-1);i++) daysArray.push(null);
    for (let d=1; d<=daysInMonth; d++) daysArray.push(d);

    const today = new Date();
    const goToPrevMonth = () => {
        const newDate = new Date(year, month-1, 1);
        setCurrent(newDate);
        onDateChange(newDate);
    };
    const goToNextMonth = () => {
        const newDate = new Date(year, month+1, 1);
        setCurrent(newDate);
        onDateChange(newDate);
    };

    return (
        <div className="mini-calendar">
            <div className="mc-header">
                <button className="mc-nav" onClick={goToPrevMonth}>‹</button>
                <div className="mc-title"><strong>{monthName.charAt(0).toUpperCase()+monthName.slice(1)} {year}</strong></div>
                <button className="mc-nav" onClick={goToNextMonth}>›</button>
            </div>
            <div className="mc-grid">
                {["L","M","M","J","V","S","D"].map((d,i)=><div key={i} className="mc-day-title">{d}</div>)}
                {daysArray.map((day,i)=>{
                    if(day===null) return <div key={`e-${i}`} className="mc-cell empty"></div>;
                    const isToday = day===today.getDate() && month===today.getMonth() && year===today.getFullYear();
                    return (
                        <div key={day} className={`mc-cell ${isToday?"today":""}`} onClick={()=>onDateChange(new Date(year,month,day))}>
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ClassCard({ classData, onClick }) {
    const hourHeight = 60;
    const duration = classData.endHour - classData.startHour;
    const topOffset = (classData.startHour - 7) * hourHeight;
    const style = {
        top: `${topOffset}px`,
        height: `${duration * hourHeight}px`,
        background: classData.color,
        borderLeft: `4px solid ${classData.accent}`,
    };

    return (
        <div className="class-card absolute-card" style={style} onClick={(e)=>{ e.stopPropagation(); onClick(); }}>
            <div className="cc-title">{classData.title}</div>
            <div className="cc-meta">{formatHour(classData.startHour)} - {formatHour(classData.endHour)} · {classData.room}</div>
            <div className="cc-teacher">{classData.teacher}</div>
        </div>
    );
}

function DetailPanel({ cls, onClose }) {
    if (!cls) return (
        <div className="detail-empty">
            <p>Selecciona una clase para ver los detalles</p>
        </div>
    );

    return (
        <div className="detail-card">
            <button className="close-btn" onClick={onClose}>✕</button>
            <div className="detail-header">
                <h2>{cls.title}</h2>
            </div>
            <div className="class-color-bar" style={{ backgroundColor: cls.color || "#A30000" }}/>
            <hr className="detail-divider"/>
            <div className="detail-section shaded">
                <div className="section-label"><ScheduleIcon size={18} color="#A30000"/> Horario</div>
                <div className="section-value">{formatHour(cls.startHour)} - {formatHour(cls.endHour)}</div>
            </div>
            <div className="detail-section shaded">
                <div className="section-label"><LocationIcon size={18} color="#A30000"/> Ubicación</div>
                <div className="section-value">{cls.room}</div>
            </div>
            <div className="detail-section shaded">
                <div className="section-label"><ProfessorIcon size={18} color="#A30000"/> Profesor</div>
                <div className="section-value">{cls.teacher}</div>
            </div>
            <div className="detail-section shaded">
                <div className="section-label"><CreditsIcon size={18} color="#A30000"/> Créditos</div>
                <div className="section-value">{cls.credits || "1 crédito"}</div>
            </div>
            <div className="detail-section shaded">
                <div className="section-label">Información adicional</div>
                <div className="info-tags">
                    <span className="tag">{cls.type || "Laboratorio"}</span>
                    <span className="tag">{cls.mode || "Presencial"}</span>
                </div>
            </div>
        </div>
    );
}

/* ---------------- Funciones auxiliares ---------------- */
function formatHour(h) {
    const hour = Math.floor(h);
    const min = (h - hour) === 0.5 ? "30" : "00";
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${min} ${suffix}`;
}

export default StudentSchedule;
