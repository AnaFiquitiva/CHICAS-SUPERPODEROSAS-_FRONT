import React from "react";
import "./SubjectDetailModal.css";
import { X } from "lucide-react";

export default function SubjectDetailModal({ subject, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Detalles de la Materia</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <h3 className="subject-title">
                        {subject.code} - {subject.name}
                    </h3>

                    <div className="subject-status">
                        <span className={`status-tag ${subject.status}`}>{subject.status}</span>
                    </div>

                    <div className="subject-details">
                        <p><strong>Código:</strong> {subject.code}</p>
                        <p><strong>Créditos:</strong> {subject.credits}</p>
                        {subject.grade && <p><strong>Calificación:</strong> {subject.grade}</p>}
                        <p><strong>Semestre:</strong> {subject.semester}</p>
                        <p><strong>Periodo cursado:</strong> 2020-2</p>
                    </div>

                    <div className="subject-prerequisites">
                        <h4>Prerrequisitos</h4>
                        <ul>
                            <li><span className="prereq-tag">MAT-1101 - Cálculo Diferencial</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
